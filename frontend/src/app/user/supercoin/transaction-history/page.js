"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import address from "../../../../../assets/contract_data/address.json";
import abi from '../../../../../assets/contract_data/abi.json';
import { useContractRead } from 'wagmi';
import Main from '@/app/Main';



const TransactionHistory = () => {

  const [isLoading,setLoading] = useState(true);

  const [userId,setId] = useState();

  
  
  useEffect(() => {
    const data = JSON.parse(localStorage.userInfo).data;
    setId(data._id);
    setLoading(false);
  },[])

  const { loading, data, error } = useContractRead({
    address: address?.address,
    abi: abi?.abi,
    functionName: "getParticipantDetails",
    args: [userId]
  });

  return (
    <Main>
    <div className="bg-white min-h-screen">
    {/*
      <nav className="bg-blue-500 text-white py-4 px-8">
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
                
              </svg>
              <span>105</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                
              </svg>
              <span>456</span>
            </div>
          </div>
        </div>
      </nav> */}
      <div className="bg-gray-100 py-12 px-8">
        <div className="container mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-70">
          <h2 className="text-3xl font-semibold mb-8">SuperCoin Transaction History</h2>
          <div>
          {
            isLoading?(<div>Loading....</div>):
            (
              <>
                {loading ? (
                  <div>Loading....</div>
                      ) : error ? (
                        <div>Error: {error.message}</div>
                      ) : (
                        <>
                        <div>
                        <h2 className="text-3xl font-bold mb-4">
                          Current Balance: {Number(data.balance)}
                        </h2>
                        <div className="space-y-4">
                          {data.history.reverse().map((txn, index) => (
                            <Link href={`/user/supercoin`} key={index}>
                              <div className={`flex justify-between items-center border-b pb-4`}>
                                <div className="flex flex-col">
                                  <div className="text-black">{txn.desc}</div>
                                  <div className="text-gray-500">Transaction on date: {new Date(Number(txn.timestamp)).getDate()}-{new Date(Number(txn.timestamp)).getMonth() + 1}-{new Date(Number(txn.timestamp)).getFullYear()}</div>
                                </div>
                                <div className="bg-gray-500 px-2 py-1 rounded">{Number(txn.balance_after)-Number(txn.balance_before)}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        </div>
                        <button onClick={()=>{console.log(data)}}>See Details</button>
                        </>
                    )}
              </>
            )
          }
          </div>
        </div>
      </div>
    </div>
    </Main>
  );
};

export default TransactionHistory;
