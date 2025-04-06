import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// import Compressor from 'compressorjs';

/**
 * Uploads a file to Cloudinary
 * @param {File} file
 * @returns {Promise<string?>} url
 */
export async function handleUpload(file) {
  if (!file) {
    alert('Please choose a file first!');
    return null;
  }

  const compressedImage = await compressImage(file);

  if (!compressedImage) {
    console.error('Error compressing image');
    return null;
  }

  const formData = new FormData();
  formData.append('file', compressedImage);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Cloudinary unsigned preset
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return res.data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return null;
  }
}

/**
 * Saves data to backend
 * @param {Object} data
 * @param {string} data.listedBy - The ID of the user who listed the item.
 * @param {string} data.name - The name of the item.
 * @param {string} data.description - The description of the item.
 * @param {string} data.price - The price of the item.
 * @param {string} data.file - The file of the item.
 * @returns {Promise<boolean>} true if successful, false otherwise
 */
export async function addItem(data) {
  const { listedBy, name, description, price, file } = data;

  try {
    const img = await handleUpload(file);

    if (!img) {
      toast.error('Image upload failed');
      return false;
    }

    const res = await axios.post(import.meta.env.VITE_API_URL + '/list/addItem', {
      listedBy,
      name,
      description,
      images: [img],
      price,
      comments: []
    });

    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (err) {
    console.warn(err);
    toast.error('Error uploading image');
    return false;
  }
}

async function compressImage(file) {
  const Compressor = (await import('compressorjs')).default;

  let compressedImage = undefined;
  try {
    compressedImage = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        height: 400,
        width: 800,
        success: resolve,
        error: reject
      });
    });
  } catch (error) {
    console.error(error);
  }

  return compressedImage;
}
