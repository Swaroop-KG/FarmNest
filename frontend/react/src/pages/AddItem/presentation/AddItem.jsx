import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import appState from '../../../data/AppState';

import { toast } from 'react-toastify';
import { addItem } from '../application/functions';
import { useQueryClient } from '@tanstack/react-query';

const AddItem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const [data, setData] = useState({
    name: '',
    description: '',
    file: '',
    price: '',
    category: ''
  });

  /**
   * Update state on input change
   * @param {React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>} e
   */
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Update state on image change
   * @param {React.ChangeEventHandler<HTMLInputElement>} e
   */
  const handleImageChange = (e) => {
    setData({
      ...data,
      file: e.target.files[0]
    });
  };

  /**
   * Adds item to the backend
   * @param {React.FormEventHandler<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate input
    if (data.category.length === 0) {
      toast.error('Select a category for the product');
      return;
    }
    if (data.name.length === 0) {
      toast.error('Enter a name for the product');
      return;
    }
    if (data.description.length === 0) {
      toast.error('Enter a description for the product');
      return;
    }
    if (data.price.length === 0) {
      toast.error('Enter a price for the product');
      return;
    }
    if (!data.file) {
      toast.error('Upload a picture for the product');
      return;
    }

    setIsLoading(true);

    const newData = {
      listedBy: appState.userData._id,
      name: data.name,
      description: data.description,
      price: data.price,
      file: data.file,
      category: data.category // ✅ Include category
    };

    const res = await addItem(newData);
    setIsLoading(false);

    if (res) {
      // update cache
      queryClient.setQueryData(['items'], (oldData) => {
        return [newData, ...(oldData || [])];
      });
      navigate('/shop');
    }
  };

  return (
    <main className={isLoading ? 'pointer-events-none' : ''}>
      <section className="h-[100vh] w-full mt-[8vh] py-14 px-14 md:px-40">
        <h1 className="text-2xl font-bold mb-6">Add Item</h1>

        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            className="select select-bordered w-full mt-2"
            name="category"
            id="category"
            value={data.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="plant">Plant</option>
          </select>

          <div className="h-4"></div>

          <label htmlFor="name">Product Name</label>
          <input
            className="input input-bordered w-full mt-2"
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />

          <div className="h-4"></div>

          <label htmlFor="description">Product Description</label>
          <input
            className="input input-bordered w-full mt-2"
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
          />

          <div className="h-4"></div>

          <label htmlFor="price">Price</label>
          <input
            className="input input-bordered w-full mt-2"
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleInputChange}
          />

          <div className="h-4"></div>

          <label htmlFor="image">Product Image</label>
          <div className="h-2"></div>
          <input
            name="image"
            id="image"
            onChange={handleImageChange}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />

          <button type="submit" className="myButton mt-10">
            {isLoading ? (
              <span className="mx-10 loading loading-dots text-white" />
            ) : (
              'Add Item'
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddItem;
