"use client";

import AddCoin from '@/components/ContractFunctions/AddCoins';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {
    const [seller,setSeller] = useState();
    const [sellerId,setSellerId] = useState();
    const [coins,setCoins] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const data = JSON.parse(localStorage.userInfo).data;
        setSeller(data);
        setSellerId(data._id);
        setLoading(false);
      },[])
  return (
    <div className='flex items-center justify-center'>{loading?(<>Loading....</>):
    (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Enter Coins</h1>
        <label htmlFor="coinInput" className="block text-sm font-medium text-gray-700 mb-2">
          Coins:
        </label>
        <input
          type="number"
          id="coinInput"
          placeholder="Enter the number of coins"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => {setCoins(Number(e.target.value))}}
        />
        <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <AddCoin 
            _id={sellerId}
            amount={Number(coins)}
            desc={`Added ${coins} coins to ${seller.name}'s account`}
            _timestamp={Date.now()}
          />
        </div>
        <Link href='/seller' className="text-indigo-600">Return to Dashboard</Link>
      </div>
    </div>
    )}</div>
  )
}

export default page