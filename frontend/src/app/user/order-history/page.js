"use client";
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import OrderPlaced from '@/components/ContractFunctions/OrderPlaced';

const OrderHistory = () => {
  const [buyer, setBuyer] = useState();
  const [buyerId, setBuyerId] = useState();
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.userInfo).data;
    setBuyer(data);
    setBuyerId(data._id);
  }, []);

  useEffect(() => {
    if (buyer && buyerId) {
      fetchData();
    }
  }, [buyer, buyerId]);

  const fetchData = async () => {
    if (buyer) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${buyer.token}`,
          },
        };
        const response = await axios.post(
          'http://localhost:5000/api/user/allorders',
          { buyerId },
          config
        );
        setOrders(response.data); // Update state with orders received from the server.
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ... your navigation bar */}
      <div className="bg-gray-100 py-12 px-8">
        <div className="container mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-70">
          <h2 className="text-3xl font-semibold mb-8">Order History</h2>
          <div>
            {isLoading ? (
              <div>Loading....</div>
            ) : (
              <div className="space-y-4">
                {orders?.map((order) => (
                  <Link href={`/user/order-history`} key={order?._id}>
                    <div className={`flex justify-between items-center border-b pb-4 cursor-pointer`}>
                      <div className="flex flex-col">
                        <div className="text-black">{order?.product.productName}</div>
                        <div className="text-gray-500">
                          Ordered on date: {new Date(order?.createdAt).getDate()}-{new Date(order?.createdAt).getMonth() + 1}-{new Date(order?.createdAt).getFullYear()}
                        </div>
                      </div>
                      <div className="bg-gray-500 px-2 py-1 rounded">
                        <div>
                          {order?.status==="orderPlaced"?(
                            <OrderPlaced
                              _buyerId={order.buyer}
                              _orderId={order._id}
                              coinsFlipkart={Math.floor((Number(order.product.productPrice)/100)*2)}
                              coinsSeller={order.product.coins}
                              _sellerId={order.product.seller}
                              _timestamp={Date.now()}
                            />
                          ):(<></>)}
                        </div>
                        {order?.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
