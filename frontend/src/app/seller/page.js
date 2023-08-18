"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {
    const [userInfo, setUserInfo] = useState(null);

    // Use useEffect to retrieve userInfo from localStorage
    useEffect(() => {
      const userInfoFromStorage = localStorage.getItem("userInfo");
      if (userInfoFromStorage) {
        setUserInfo(JSON.parse(userInfoFromStorage));
      }
    }, []);
    const number = 1;
    return (
      <div className="bg-white min-h-screen">
        <nav className="bg-blue-500 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">RootKart</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 2c-3.526 0-6.62 1.791-8.426 4.522A9.962 9.962 0 002 12c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10zm5.156 5.156a2 2 0 10-2.312 2.312A2 2 0 0018.156 7.156zM5.866 6.05a7.963 7.963 0 014.73-2.363M4 12a8 8 0 0110.315-7.59M18.865 17.95a7.963 7.963 0 01-4.73 2.363M20 12a8 8 0 01-10.316 7.59"
                  />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 0v10l2.5-1.5M12 14l-2.5 1.5M9.5 15.5l-2.5-1.5M14.5 15.5L12 14"
                  />
                </svg>
                <span>456</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto grid grid-cols-2 gap-8">
              <Link href='/seller/addproduct'>
                <div className="hover:bg-blue-300 hover:scale-105 transform transition-transform duration-300 border-zinc-100">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-semibold mb-4">Add Product</div>
                    <div className="text-gray-500">Click Here to Add product to your store</div>
                  </div>
                </div>
              </Link>
              <Link href={`/page-${2}`}>
                <div className="hover:bg-blue-300 hover:scale-105 transform transition-transform duration-300 border-zinc-100">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-semibold mb-4">Button {number}</div>
                    <div className="text-gray-500">Card {number} description</div>
                  </div>
                </div>
              </Link>
              <Link href={`/page-${3}`}>
                <div className="hover:bg-blue-300 hover:scale-105 transform transition-transform duration-300 border-zinc-100">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-semibold mb-4">Button {number}</div>
                    <div className="text-gray-500">Card {number} description</div>
                  </div>
                </div>
              </Link>
              <Link href={`/page-${4}`}>
                <div className="hover:bg-blue-300 hover:scale-105 transform transition-transform duration-300 border-zinc-100">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-semibold mb-4">Button {number}</div>
                    <div className="text-gray-500">Card {number} description</div>
                  </div>
                </div>
              </Link>
          </div>
        </div>
      </div>
    );
}

export default page;