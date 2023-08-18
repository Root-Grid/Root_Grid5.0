"use client"

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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
        router.push('/user');
  
      }
      
    } catch(error) {
      console.log(error);
    }
    
  }
  return (
    <div className='container mx-auto px-4 	border-style: solid border-white'>
      <h1 className="mb-3 text-lg font-bold">Log In</h1>
      <form>
        <div className="join join-vertical lg:join-horizontal">
          <button className="btn join-item" onClick={()=>{setIsSeller(true)}}>Seller</button>
          <button className="btn join-item" onClick={()=>{setIsSeller(false)}}>Buyer</button>
        </div>
        <input
          required
          name="email"
          placeholder="Email"
          className="input-bordered input mb-3 w-full"
          onChange={e => {setEmail(e.target.value)}}
        />
        <input
          required
          type='password'
          name="password"
          placeholder="Password"
          className="input-bordered input mb-3 w-full"
          onChange={e => {setPassword(e.target.value)}}
        />
        
        <button type='submit' className='btn-primary btn' placeholder='submit' onClick={submitHandler}>Submit</button>
      </form>
      <div>New User? <Link href='/signup' className='text-amber-300'>Click Here</Link></div>
    </div>
  )
}

export default loginPage