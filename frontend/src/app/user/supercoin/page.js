"use client";

import CouponCard from '@/components/CouponCard';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const supercoinDashboard = () => {
  let balance = 55;
  /* super coin */

  const [coupons,setCoupons] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  });

  async function fetchCoupons(){
    const data = await axios.get("http://localhost:5000/api/admin/getcoupons");

    setCoupons(data.data);
    setLoading(false);
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
          
          <div className="mb-4"><h2 className="text-3xl font-semibold mb-8">Your Account balance is {balance}</h2></div>
          
          <div className="flex space-x-4 mb-4">
          <Link href='/user/supercoin/transaction-history'>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Transaction History</button>
          </Link>
          <Link href='/user/supercoin/claimed-coupons'>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Claimed Coupons</button>
          </Link>
          </div>
          <img src="/path/to/your/image.png" alt="Transaction Image" className="w-full mb-4 rounded-lg shadow-md" />
          <div className="space-y-4">
          {loading?(<>loading.....</>):(<>{
            coupons.map((coupon,index) => (
              <CouponCard key={index}coupon={coupon} />
            ))}</>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default supercoinDashboard;
