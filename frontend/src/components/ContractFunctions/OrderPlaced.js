import React from 'react'
import {
    useContractWrite,
} from "wagmi";
import { useEffect } from "react";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';
import axios from 'axios';


const OrderPlaced = ({_buyerId,  _orderId,  coinsFlipkart, coinsSeller,  _sellerId, _timestamp }) => {
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
        functionName: "claimCoins",
    });

    const registerUser = async () => {
        await registerWrite({args: [_buyerId,  _orderId,  coinsFlipkart, coinsSeller,  _sellerId, _timestamp]})

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        // };
        // await axios.post(
        //     "http://localhost:5000/api/admin/change-order-status",
        //     { _orderId },
        //     config
        // )
    }


  return (
    <button onClick={registerUser}>Avail Coin!</button>
  )
}

export default OrderPlaced;