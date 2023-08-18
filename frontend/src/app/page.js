"use client";

import Link from "next/link"
import { useEffect, useState } from "react";


export default function Home() {
  
  const [userInfo, setUserInfo] = useState(null);

  // Use useEffect to retrieve userInfo from localStorage
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
    console.log(JSON.parse(userInfoFromStorage).data);
  }, []);
  return (
    <div>
        <div className="center">
          <h1 className="mb-3 text-lg font-bold">Login</h1>
          <form>
            <input
              required
              name="email"
              placeholder="email"
              className="input-bordered input mb-3 w-full"
            />
            <input
              required
              name="password"
              placeholder="password"
              type="password"
              className="input-bordered input mb-3 w-full"
            />
            {/* <FormSubmitButton className="btn-block">Add Product</FormSubmitButton> */}
            </form>
            <Link href='/signup'>
              <button className="btn join-item">signup</button>
            </Link>
            <div>{userInfo?.data.name}</div>
        </div>
    </div>
  )
}
