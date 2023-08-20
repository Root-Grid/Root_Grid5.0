import React from 'react';

const transactions = [
  { status: 'credited', date: '2023-08-15', amount: -100 },
  { status: 'debited', date: '2023-08-14', amount: 200 },
];

const claimedCoupons = () => {
  const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="bg-white p-6 w-90 h-full rounded-lg shadow-md ">
      <div className="mb-4 text-3xl font-semibold">Your Account Balance: {balance}</div>

      <img src="/path/to/your/image.png" alt="Transaction Image" className="w-full h-auto mb-4 rounded-lg" />
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b pb-4 ${
              transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">Transaction {index + 1}</div>
              <div className="text-gray-500">
                {transaction.status} on {transaction.date}
              </div>
            </div>
            <div className="bg-gray-500 px-2 py-1 rounded-md">
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

export default claimedCoupons;
