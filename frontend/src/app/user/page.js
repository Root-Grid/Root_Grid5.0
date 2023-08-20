"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
// import ProductCard from './ProductCard';
import AProductCard from '../../components/AProductCard'
import Image from 'next/image';
import Main from '../Main';
import HeroBanner from '@/components/HeroBanner';

function userHome() {


  // const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [products, setProducts] = useState();
  // Use useEffect to retrieve userInfo from localStorage
  const currentPage = 1;
  // useEffect(() => {
  //   const userInfoFromStorage = localStorage.getItem("userInfo");

  //   if (userInfoFromStorage) {
  //     setUserInfo(JSON.parse(userInfoFromStorage));
  //   }
  // }, []);

  async function fetchData() {
    // const sellerId = "64d9bc1985a03fe1d1aba5db";
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
      const product = await axios.get(
        "http://localhost:5000/api/seller/allproducts"
      );
      // console.log(product.data);
      setProducts(product.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  // setProducts(data.data);

  return (
    <div>
      <Main>
      <div>
        {isLoading ? (
          <div>loading.....</div>
        )
          :
          (
            <div className="flex flex-col items-center">
                {/* <div className="hero rounded-xl bg-base-200">
                  <div className="hero-content flex-col lg:flex-row">
                    <Image
                      src={products[0]?.productImage}
                      alt={products[0]?.productName}
                      width={400}
                      height={800}
                      className="w-full max-w-sm rounded-lg shadow-2xl"
                      priority
                    />
                    <div>
                      <h1 className="text-5xl font-bold">{products[0]?.productName}</h1>
                      <p className="py-6">{products[0]?.productDiscription}</p>
                      <Link
                        href={"/user/products/" + products[0]?._id}
                        className="btn-primary btn"
                      >
                        Check it out
                      </Link>
                    </div>
                  </div>
                </div> */}
              {currentPage === 1 && (
                <HeroBanner />
              )}

              <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {/* <div key={product._id}>{product.productName}</div> */}
                {products?.map((product) => (
                  <AProductCard product={product} key={product._id} />
                ))}
              </div>

              {/* {totalPages > 1 && (
              <PaginationBar currentPage={currentPage} totalPages={totalPages} />
            )} */}
            </div>
          )
        }
      </div>
      </Main>
    </div>
  )
}

export default userHome

