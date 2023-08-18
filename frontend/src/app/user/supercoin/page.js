import React from 'react';

const transactions = [
  { status: 'credited', date: '2023-08-15', amount: -100 },
  { status: 'debited', date: '2023-08-14', amount: 200 },
];

const TransactionHistory = () => {
  const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 w-700">
        <div className="mb-4">Your Account balance is {balance}</div>
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Button 1</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Button 2</button>
        </div>
        <img src="/path/to/your/image.png" alt="Transaction Image" className="w-full mb-4" />
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
                <div className="text-gray-500">{transaction.status}  {transaction.date}</div>
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
  );
};

export default TransactionHistory;