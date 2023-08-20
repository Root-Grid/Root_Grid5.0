// CouponCard.jsx

import React from 'react';

function CouponCard({ coupon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold">{coupon.name}</h3>
      <p className="text-gray-500">{coupon.discription}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-blue-500 font-semibold">{coupon.coins} Supercoins</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
          Redeem
        </button>
      </div>
    </div>
  );
}

export default CouponCard;
