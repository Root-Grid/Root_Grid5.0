import React, { useState } from 'react'

import axios from 'axios';

function FindProducts() {
    const [ sellerId, setSellerId] = useState();
    const [ error, setError] = useState();
    const [sellerName,setSellerName] = useState("");
    const [product,setProduct] = useState();
    const [loyalCustomers,setLoyalCustomers] = useState();

    const submitHandler = async () => {
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
      
            const { data }  = await axios.post(
              "/api/seller/getseller",
              { sellerId },
              config
            );
            setSellerName(data.name);

            const product  = await axios.post(
              "/api/seller/allproducts",
              { sellerId },
              config
            );
            // console.log(product.data);
            setProduct(product.data);

            const loyalCustomers = await axios.post(
              "/api/seller/loyalcustomers",
              { sellerId },
              config
            )
            // console.log(loyalCustomers.data);
            setLoyalCustomers(loyalCustomers.data);
        } catch(error) {
            setError(error);
        }
    }
  return (
    <div>FindProducts
        <div>
            <input onChange={(e) => {setSellerId(e.target.value)}}/>
            <div onClick={submitHandler}>submit {sellerId}</div>
            <div>name: {sellerName}</div>
            {/* <div>
            product-----------
              {product ? (
                <div>
                  {product?.map((p) => (
                    <div key={p._id}>{p.productName}</div>
                  ))}
                </div>
              ) : (
                <div>No products found</div>
              )}
            </div> */}
            <div>
            customers----
              {loyalCustomers? (
                <div>
                  {loyalCustomers?.map((l) => (
                    <div key={l.buyerId}>name: {l.buyer.name}, loyalty:{l.loyalty}</div>
                  ))}
                </div>
              ) : (
                <div>No customer found</div>
              )}
            </div>
            <div>{error}</div>
        </div>
    </div>
  )
}

export default FindProducts