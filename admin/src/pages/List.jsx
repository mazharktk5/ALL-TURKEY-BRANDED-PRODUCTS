import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [list, setList] = useState([]); // State to hold list of products

  // Fetch product list from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');

      if (response.data.success) {
        setList(response.data.products); // Set the list if successful
      } else {
        toast.error(response.data.message); // Show error message if not successful
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message); // Show error if API fails
    }
  };

  // Remove a product from the list
  const removeProduct = async (id) => {
    try {
      console.log("Attempting to remove:", id);

      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      console.log("Remove Response:", response.data);

      // If removal is successful
      if (response.data.success || response.data.succes) {
        toast.success(response.data.message);
        // Filter the product from list state
        setList(prevList => prevList.filter(item => item._id !== id));
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log("Error removing product:", error);
      toast.error(error.message);
    }
  };

  // Fetch product list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products Lists</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Product List</h2>

        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 p-2 rounded text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Product List Rows */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center py-3 border-b text-sm"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <span>{item.name}</span>
            <span className="hidden md:inline">{item.category}</span>
            <span>{currency}{item.price}</span>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 font-bold cursor-pointer text-center"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
