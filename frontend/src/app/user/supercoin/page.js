"use client";

import CouponCard from '@/components/CouponCard';
import axios from 'axios';
import Link from 'next/link';
import { useContractRead } from 'wagmi';
import React, { useEffect, useState } from 'react';

import contract_abi from "../../../../assets/contract_data/abi.json"
import contract_address from "../../../../assets/contract_data/address.json"
import Main from '@/app/Main';

const supercoinDashboard = () => {
  const [data, setData] = useState({});

  const userData = localStorage.getItem('userInfo');
  const info = JSON.parse(userData);

  const id = info?.data?._id;
  console.log("Id", id);
  const {
    data: userDetails,
  } = useContractRead({
    address: contract_address?.address,
    abi: contract_abi?.abi,
    functionName: "getParticipantDetails",
    args: [id]
  });

  useEffect(() => {
    setData({ Details: userDetails })
    console.log("Success", (data));
  }, [id])

  const [coupons, setCoupons] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  });

  async function fetchCoupons() {
    const data = await axios.get("http://localhost:5000/api/admin/getcoupons");

    setCoupons(data.data);
    setLoading(false);
  }


  return (
    <div className="bg-white min-h-screen">
      <Main>
        <div className="bg-gray-100 py-12 px-8">
          <div className="container mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-70">

            <div className="mb-4"><h2 className="text-3xl font-semibold mb-8">Your Account balance is {Number(data.Details?.balance)}</h2></div>

            <div className="flex space-x-4 mb-4">
              <Link href='/user/supercoin/transaction-history'>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Transaction History</button>
              </Link>
              <Link href='/user/supercoin/claimed-coupons'>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Claimed Coupons</button>
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (<>loading.....</>) : (<>{
                coupons.map((coupon, index) => (
                  <CouponCard key={index} coupon={coupon} />
                ))}</>)}
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default supercoinDashboard;
