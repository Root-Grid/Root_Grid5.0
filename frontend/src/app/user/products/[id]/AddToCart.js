"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function AddToCartButton() {
  const [isPending, setPending] = useState(false);
  const [success, setSuccess] = useState(""); // Initialize success state
  const [user,setUserInfo] = useState();
  const [order,setOrder] = useState();
  const [orderId,setOrderId] = useState();
  const [order_state,setOrderState] = useState("Buy Now!");

  const params = useParams();

  useEffect(() => {
      const userInfoFromStorage = localStorage.getItem("userInfo");

      if (userInfoFromStorage) {
        setUserInfo(JSON.parse(userInfoFromStorage).data);
      }
      
    }, []);

  const submitClick = async () => {
    // /api/user/buyproduct

    setPending(true);
    const productId = params.id;
    const buyerId = user._id;
    // console.log(user.token);

    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(
      "http://localhost:5000/api/user/buyproduct",
      {productId, buyerId},
      config
    )
    // console.log(response.data);
    setOrder(response.data);
    setOrderId(response.data._id);
    setPending(false);
    setSuccess("Order Success");
    setOrderState("Return!");
  }

  const submitReturn = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    };
    // const response = await axios.post(
    //   "http://localhost:5000/api/user/checkorder",
    //   { orderId },
    //   config
    // )
    // console.log(response.data);
    // const status = response.data;

    // console.log(orderId);
    try{
      const data = await axios.post(
        "http://localhost:5000/api/user/returnproduct",
        { orderId },
        config
      )

      if(data){
        setOrderState("Returened!");
        setSuccess("Product Returned!");
      }

    } catch(error) {
      setSuccess("Timeout");
    }
    
  }; 

  return (
    <div>
    {order && order.status === "Indeterminent"?
    (
      <div className="flex items-center gap-2">
        <button
          className="btn-primary btn"
          onClick={submitReturn}
        >
          {order_state}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
        {isPending && <span className="loading loading-spinner loading-md" />}
        {!isPending  && (
          <span className="text-success">{success}</span>
        )}
      </div>
    ):(
      <div>
        <div className="flex items-center gap-2">
          <button
            className="btn-primary btn"
            onClick={submitClick}
          >
            {order_state}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {isPending && <span className="loading loading-spinner loading-md" />}
          {!isPending  && (
            <span className="text-success">{success}</span>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default AddToCartButton;
