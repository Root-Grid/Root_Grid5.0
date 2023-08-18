"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddToCartButton from './AddToCart'
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ProductPage( ) {
  const [isLoading,setLoading] = useState(true);
  const [product,setProduct] = useState();
    const params = useParams();
    // console.log(params);
  const fetchData = async () => {
    try{
      // console.log(params.id);
      const product = await axios.get(`http://localhost:5000/api/user?productId=${params.id}`);
      // console.log(product.data.productName);
      setProduct(product.data);
      setLoading(false);
    } catch(error) {
      console.log("errorrr");
    }
  }

  useEffect(()=> {
    fetchData();
  },[]);

    // const product = {
    //     name: "chawal",
    //     imageUrl: `https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80`,
    //     price: 100,
    //     description: "asdhanfksdlfksldfhkldjfndsljkfnjkadfnkasbfasnbfjlasbfjasbfsjafbsjfbsdfbsdndlfsdlkfndjlkfbsdjfbsdjfbsjdbfsjdbfsjdbfsjkdbfsjfba"
    // }


    
  return (
    <div>{isLoading?(<div>loading....</div>):(
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Image
          src={product.productImage}
          alt={product.productName}
          width={500}
          height={500}
          className="rounded-lg"
          priority
        />

        <div>
          <h1 className="text-5xl font-bold">{product.productName}</h1>
          {/* <PriceTag price={product.price} className="mt-4" /> */}
          <span>{product.productPrice}</span>
          <p className="py-6">{product.productDiscription}</p>
          <AddToCartButton
            productId={product._id}
          //   incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>)}
    </div>
  )
}