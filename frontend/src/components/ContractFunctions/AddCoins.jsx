import React from 'react'
import {
    useContractWrite,
} from "wagmi";
import { useEffect } from "react";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';


const AddCoin = ({ _id, amount, desc, _timestamp }) => {
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
        functionName: "addBalance",
    });

    const registerUser = async () => {
        await registerWrite({args: [_id, amount, desc, _timestamp]})
    }


  return (
    <button onClick={registerUser}>Add Coins</button>
  )
}

export default AddCoin;