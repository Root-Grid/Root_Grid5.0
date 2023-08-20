"use client"

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
// import { ConnectButton } from '@rainbow-me/rainbowkit';

function loginPage() {
  // const [user,setUser] = useState("");
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [isSeller,setIsSeller] = useState(false);

  const router = useRouter()
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if(isSeller){
        const data   = await axios.post(
          "http://localhost:5000/api/seller/login",
          { email, password },
          config
        );
          
        // setUser(data.data);

        // console.log(data.data.name);
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("role","seller");
        router.push('/seller');
      }
      else{
        const data  = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password },
          config
        );

        // setUser(data.data);
        // console.log(data.data.name);
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("role","buyer");
        router.push('/user');
  
      }
      
    } catch(error) {
      console.log(error);
    }
    
  }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Log In</h1>
        <div className="mb-4">
          <button
            className={`w-1/2 py-2 px-4 rounded-tl-lg rounded-bl-lg ${
              isSeller ? 'bg-gray-300' : 'bg-blue-500 text-white'
            }`}
            onClick={() => setIsSeller(false)}
          >
            Buyer
          </button>
          <button
            className={`w-1/2 py-2 px-4 rounded-tr-lg rounded-br-lg ${
              isSeller ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setIsSeller(true)}
          >
            Seller
          </button>
        </div>
        <form>
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={submitHandler}
          >
            Submit
          </button>
          
          {/* <div >
            <ConnectButton label="Sign in"/>
          </div> */}

        </form>
        <div className="mt-4 text-center">
          New User?{' '}
          <Link href="/signup" className="text-blue-500">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default loginPage