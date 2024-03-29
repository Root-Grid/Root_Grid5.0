"use client";

import axios from 'axios';
import Link from 'next/link';
import AProductCard from '../../components/AProductCard';
import React, { useEffect, useState } from 'react'
import Connectbutton from '@/components/Connectbutton';

import { useAccount, useContractRead } from 'wagmi';
import contract_abi from "../../../assets/contract_data/abi.json"
import contract_address from "../../../assets/contract_data/address.json"
import RegisterParticipant from '@/components/ContractFunctions/RegisterParticipant';

function page() {
  const {address} = useAccount()
  const [data, setData] = useState({});
  const [seller, setSeller] = useState();
  const [sellerId, setSellerId] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  // Use useEffect to retrieve userInfo from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.userInfo).data;
    setSeller(data);
    setSellerId(data._id);
    setLoading(false)
  }, [])

  useEffect(() => {
    if (seller && sellerId) {
      fetchData();
    }
  }, [seller, sellerId]);

  const {
    data: userDetails,
  } = useContractRead({
    address: contract_address?.address,
    abi: contract_abi?.abi,
    functionName: "getParticipantDetails",
    args: [sellerId]
  });

  useEffect(() => {
    setData({ Details: userDetails })
    console.log("Success", (userDetails));
  }, [sellerId])

  const fetchData = async () => {
    if (seller) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${seller.token}`,
          },
        };
        const data = await axios.post(
          "http://localhost:5000/api/seller/allproducts",
          { sellerId },
          config
        )
        console.log(seller);
        setProducts(data.data);
        setLoading(false);
        // console.log(data.data);
      } catch (error) {
        console.log(`error: ${error} `);
      }
    }
  }

  return (
    <div className="bg-white min-h-screen text-black">
      <nav className="bg-blue-600 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/root1.png"
              alt="Your Logo"
              className="h-10 w-15"
            />
            <Link href="/">
            <div className="text-2xl font-bold">RootKart</div>
            </Link>
          </div>
          <div className="text-2xl font-bold">{loading ? (<>Loading...</>) : (<>{seller.name}'s Deshboard</>)}</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Supercoins: {Number(data.Details?.balance)}</span>
            {address ? (!userDetails ?
              <div>
                {
                  !loading ? 
                <RegisterParticipant name={seller?.name} id={sellerId} role="seller" timestamp={Date.now()} />
                : null
                }
              </div>
              :
              <></>) : null
            }
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/seller/addproduct">
            <div className="item">
              <div className="item-inner">
                <div className="text-xl font-semibold mb-2">Add Product</div>
                <div className="text-gray-500">
                  Click Here to Add product to your store
                </div>
              </div>
            </div>
          </Link>
          <Link href="/seller/loyalcustomers">
            <div className="item">
              <div className="item-inner">
                <div className="text-xl font-semibold mb-2">
                  Loyal Customers
                </div>
                <div className="text-gray-500">
                  Know your loyal customers and reward them!!
                </div>
              </div>
            </div>
          </Link>
          <Link href="/seller/transaction-history">
            <div className="item">
              <div className="item-inner">
                <div className="text-xl font-semibold mb-2">
                  Transaction History
                </div>
                <div className="text-gray-500">
                  View your transaction history of supercoins
                </div>
              </div>
            </div>
          </Link>
          <Link href="/seller/addcoin">
            <div className="item">
              <div className="item-inner">
                <div className="text-xl font-semibold mb-2">Add Coin</div>
                <div className="text-gray-500">
                  Buy some supercoins to reward your customers!!
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='w-90 mx-10 px-auto my-20 flex justify-center items-center'>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">YOUR PRODUCTS</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products?.map((product) => (
                <AProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
        .item {
          border: 1px solid #e2e2e2;
          background-color: #fff;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
        }

        .item:hover {
          transform: scale(1.05);
          background-color: #93C5FD;
        }

        .item-inner {
          display: flex;
          flex-direction: column;
        }
      `}</style>
      </div>
    </div>
  );

}

export default page;