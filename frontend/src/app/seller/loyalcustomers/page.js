"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const AddProduct = () => {
    const [threshold,setThreshold] = useState();
    const [seller,setSeller] = useState();
    const [sellerId,setSellerId] = useState();


    useEffect(() => {
        const data = JSON.parse(localStorage.userInfo).data;
        setSeller(data);
        setSellerId(data._id);
    },[])

    const router = useRouter();

    const submitHandler = async(e) => {
        e.preventDefault();
        if(!threshold ) {
            console.log(`fill the fields`);
            return;
        }
        const config = {
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${seller.token}`,
            },
        };
        try{
            const data   = await axios.post(
                "http://localhost:5000/api/seller/loyalcustomers",
                { sellerId, threshold },
                config
            );
            console.log(data.data);
            // router.push('/seller');
        } catch(error) {
            console.log(error);
        }
    }


  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-blue-500 text-white py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">RootKart</div>
          <div className="flex items-center space-x-4">
            {/* Icons and numbers */}
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* ... wallet icon path */}
              </svg>
              <span>123</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* ... coin icon path */}
              </svg>
              <span>456</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-gray-100 py-12 px-8">
        <div className="container mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-8">Loyal Customers</h2>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">Threshold Loyalty</label>
              <input
                onChange={(e) => {setThreshold(e.target.value)}}
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                onClick={submitHandler}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Product
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;