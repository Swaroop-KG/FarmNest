import axios from 'axios';
import { toast } from 'react-toastify';
import appState from '../../../data/AppState';

/**
 * Get a list of items from the database.
 * @param {string} filter - The filter to apply to the list.
 * @returns {Promise<Item[]>} - The sorted or filtered list of items.
 */
export default async function getItems(filter = '0') {
  let list;

  if (appState.isFarmer()) {
    list = await getAllFarmerItems(appState.getUserData()._id);
  } else {
    list = await getAllItems();
  }

  // Category-based filters
  switch (filter) {
    case '6': // Vegetable
      return list.filter(item => item.category?.toLowerCase() === 'vegetable');
    case '7': // Fruit
      return list.filter(item => item.category?.toLowerCase() === 'fruit');
    case '8': // Plant 
      return list.filter(item => item.category?.toLowerCase() === 'plant');
    default:
      return sortList(list, filter);
  }
}

/**
 * Get First Four Items for Home Page
 * @returns {Promise<Array<Item>>} - First Four Items
 */
export async function getFourItems() {
  let list = [];
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/list/getRecent`);

  if (res.data.statusCode === 200 && res.data.data) {
    list = res.data.data.slice(0, 4);
  }

  return list;
}

/**
 * Sort a list of items based on a filter.
 * @param {Array<Item>} list - The list of items to sort.
 * @param {string} filter - The filter to apply to the list.
 * @returns {Array<Item>} - The sorted list of items.
 */
export function sortList(list, filter) {
  switch (filter) {
    case '0': // Latest
      return list.sort((a, b) => b.listedAt - a.listedAt);
    case '1': // Oldest
      return list.sort((a, b) => a.listedAt - b.listedAt);
    case '2': // A-Z
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case '3': // Z-A
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case '4': // Price: Low to High
      return list.sort((a, b) => a.price - b.price);
    case '5': // Price: High to Low
      return list.sort((a, b) => b.price - a.price);
    default:
      return list;
  }
}

/**
 * Get all items from the database.
 * @returns {Promise<Array<Item>>} - The list of all items.
 */
export async function getAllItems() {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/list/getAll');
  return res.data.data;
}

/**
 * Get all items listed by the current farmer from the database.
 * @param {string} id - Farmer ID.
 * @returns {Promise<Array<Item>>} - Items listed by the farmer.
 */
export async function getAllFarmerItems(id) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/list/getAll/${id}`);
  return res.data.data;
}

/**
 * Get an item from the database by ID.
 * @param {string} id - Item ID.
 * @returns {Promise<Item>} - The item with the specified ID.
 */
export async function getItem(id) {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/list/getItem/' + id);
  return res.data.data;
}

/**
 * Add a comment to an item in the database.
 * @param {Object} comment - The comment to add.
 * @param {string} comment.itemID - Item ID.
 * @param {string} comment.comment - Comment content.
 * @returns {Promise<Object>} - Response data.
 */
export async function addComment(comment) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to add a comment');
    return null;
  }

  const res = await axios.post(import.meta.env.VITE_API_URL + '/list/comment', {
    commentBy: appState.getUserData()._id,
    itemID: comment.itemID,
    name: appState.getUserData().name,
    content: comment.comment,
    commentAt: Date.now()
  });

  toast.success('Comment added successfully!');
  return res.data.data;
}

/**
 * Delete an item from the database.
 * @param {string} itemId - Item ID to delete.
 * @param {string} listedBy - ID of the user who listed the item.
 * @returns {Promise<Object|number>} - Result or 0 on failure.
 */
export async function deleteItem(itemId, listedBy) {
  if (appState.isAdmin() || appState.isOwner(listedBy)) {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/deleteItem', {
      adminId: appState.getUserData()._id,
      itemId
    });

    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
      return res.data.data;
    } else {
      toast.error(res.data.message);
      return 0;
    }
  }

  if (appState.getUserData().userType !== 'admin') {
    toast.error('You must be an admin to delete an item');
  }

  if (!appState.isOwner(listedBy)) {
    toast.error('You are not the owner of the item');
  }

  return 0;
}

/**
 * Returns the user's profile from the database.
 * @param {string} id - User ID.
 * @returns {Promise<User>} - User data.
 */
export async function getUserFromId(id) {
  const res = await axios.get(import.meta.env.VITE_API_URL + '/auth/' + id);

  if (!res || !res.data.data) {
    throw new Error('User not found');
  }

  return res.data.data;
}
