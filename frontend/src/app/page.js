"use client";


import Link from "next/link"
import { useEffect, useState } from "react";
import "../../style/page.css";

export default function Home() {
  
  const [userInfo, setUserInfo] = useState(null);

  // Use useEffect to retrieve userInfo from localStorage
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
    // console.log(JSON.parse(userInfoFromStorage).data);
  }, []);
  return (
      <div className=" min-h-screen flex flex-col justify-center items-center" id="main_page">
        <div className="text-white text-center animate-fade-in-down text_box">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg text-gray-200 mb-6">
            If you already have an account, please log in. Otherwise, sign up to get started.
          </p>
          <div className="space-x-4 main_boxes">
            <Link href="/login">
              <div className={` ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg  main_button`}>
                Log In
              </div>
            </Link>
            <Link href="/signup">
              <div className={` ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg  main_button_2`}>
                Sign Up
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="main_name">{userInfo?.data.name}</div>
        </div>
      </div>
    );
}
