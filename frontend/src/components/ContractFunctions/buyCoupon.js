import React from 'react'
import {
    useContractWrite,
} from "wagmi";
import { useEffect } from "react";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';
// import axios from 'axios';


const BuyCoupon = ({_customer_id, amount, _couponId, _timestamp }) => {
    useEffect(() => {
        console.log("registerData:", registerData);
        console.log("isRegisterLoading:", isRegisterLoading);
        console.log("isRegisterStarted", isRegisterStarted);
        console.log("RegisterError:", registerError);
        console.log("___________");
    }, [registerData, isRegisterLoading, isRegisterStarted]);

    const {
        data: registerData,
        write: registerWrite,
        isLoading: isRegisterLoading,
        isSuccess: isRegisterStarted,
        error: registerError,
    } = useContractWrite({
        address: address?.address,
        abi: abi?.abi,
        functionName: "buyCoupon",
    });

    const registerUser = async () => {
        

        // feathData();

        await registerWrite({args: [_customer_id, amount, _couponId, _timestamp ]})
    }

    // const feathData = async() => {
    //     try{
    //         const data = await axios.post(
    //             "http://localhost:5000/api/user/buycoupon",
    //             {}
    //         )
    //     }
    // }


  return (
    <button onClick={registerUser}>Buy Coupon!</button>
  )
}

export default BuyCoupon;