// CouponCard.jsx
"use client";

import React, { useEffect, useState } from 'react';
import BuyCoupon from './ContractFunctions/BuyCoupon';

function CouponCard({ coupon }) {


  const [customerId,setId] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
    const data = JSON.parse(localStorage.userInfo).data;

    setId(data._id);
    setLoading(false);
  },[])
  return (
    <>{loading?(<>Loading....</>):(
    
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold">{coupon.name}</h3>
      <p className="text-gray-500">{coupon.discription}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-blue-500 font-semibold">{coupon.coins} Supercoins</span>
        <div className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
          <BuyCoupon 
            _customer_id={customerId}
            amount={coupon.coins}
            _couponId={coupon._id}
            _timestamp={Date.now()}
          />
        </div>
      </div>
    </div>)}
    </>
  );
}

export default CouponCard;
