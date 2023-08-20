"use client"

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function signuppage() 
{
  const [isSeller,setIsSeller] = useState(false);
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [cnfpassword,setCnfPassword] = useState();
  const [error,setError] = useState('');

  const router = useRouter()
  const submitHandler = async (e) => {
    e.preventDefault();

    if(password != cnfpassword) {
      console.log("password doesnt matches");
    }
    
    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if(isSeller){
        const data   = await axios.post(
          "http://localhost:5000/api/seller/",
          { name, email, password },
          config
        );
          
        // setUser(data.data);

        console.log(data.data.name);
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("role","seller");
        router.push('/seller');
        
      }
      else{
        const data  = await axios.post(
          "http://localhost:5000/api/user/",
          { name, email, password },
          config
        );

        // setUser(data.data);
        console.log(data.data.name);
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("role","buyer");
        router.push('/user');
  
      }
      
    } catch(error) {
      console.log(error);
    }
    
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
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
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mb-2 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-2 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-2 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            required
            type="password"
            name="cnfpassword"
            placeholder="Confirm Password"
            className="w-full mb-4 py-2 px-3 border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setCnfPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={submitHandler}
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          Already Signed Up?{' '}
          <Link href="/login" className="text-blue-500">
            Login Here
          </Link>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  )
}

export default signuppage