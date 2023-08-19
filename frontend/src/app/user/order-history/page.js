"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const transactions = [
  { date: '2023-08-15', amount: -100 },
  { date: '2023-08-14', amount: 200 },
  // ... other transactions
];

const orderHistory = () => {
    const [buyer,setBuyer] = useState();
    const [buyerId,setBuyerId] = useState();
    const [orders,setOrders] = useState();
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        const data = JSON.parse(localStorage.userInfo).data;
        setBuyer(data);
        setBuyerId(data._id);
    },[])

    useEffect(() => {
      fetchData();
    }, [buyer])

    const fetchData = async () => {
      if(buyer){
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${buyer.token}`,
            },
          };
          const data = await axios.post(
            "http://localhost:5000/api/user/allorders",
            { buyerId },
            config
            )

            setOrders(data.data);
            setLoading(false);
            // console.log(data.data);
          } catch(error) {
          console.log(`error: ${error} `);
        }
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
        <div className="container mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-70">
          <h2 className="text-3xl font-semibold mb-8">Order History</h2>
          <div>
          {
            isLoading?(<div>Loading....</div>):
            (
              <div className="space-y-4">
                  {orders.map((order) => (
                    <Link href={`/user/products/${order.product}`} key={order._id}>
                    <div className={`flex justify-between items-center border-b pb-4`}>
                      <div className="flex flex-col">
                        <div className="text-black">{order._id}</div>
                        <div className="text-gray-500">Ordered on date: {new Date(order.createdAt).getDate()}-{new Date(order.createdAt).getMonth() + 1}-{new Date(order.createdAt).getFullYear()}</div>
                      </div>
                      <div className="bg-gray-500 px-2 py-1 rounded">
                        {order.status}
                      </div>
                    </div>
                    </Link>
                  ))}
              </div>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderHistory;