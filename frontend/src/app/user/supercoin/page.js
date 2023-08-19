"use client";




import React from 'react';

const transactions = [
  { date: '2023-08-15', amount: -100 },
  { date: '2023-08-14', amount: 200 },
  // ... other transactions
];

const TransactionHistory = () => {
  const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
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
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Button 1</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Button 2</button>
          </div>
          <img src="/path/to/your/image.png" alt="Transaction Image" className="w-full mb-4 rounded-lg shadow-md" />
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className={`flex justify-between items-center border-b pb-4 ${
                  transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <div className="flex flex-col">
                  <div className="text-black">Transaction {index + 1}</div>
                  <div className="text-gray-500">{transaction.date}</div>
                </div>
                <div className="bg-gray-500 px-2 py-1 rounded">
                  {transaction.amount > 0 ? '+' : '-'}
                  {Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;