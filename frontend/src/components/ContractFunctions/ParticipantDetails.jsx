import React from 'react'
import {
    useContractRead,
} from "wagmi";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';

const ParticipantDetails = () => {
    const data = localStorage.getItem("userInfo")
    const info = JSON.parse(data);
    const id = info?.data?._id;
    console.log("got id", id);
    
    const {
        data: userDetails,
    } = useContractRead({
        address: address?.address,
        abi: abi?.abi,
        functionName: "getParticipantDetails",
        args: [id]
    });

    console.log("Success", userDetails);

    const ParticipantDetails = async() => {
        try {
            console.log(contractRead.data);
            localStorage.setItem('ParticipantDetails', JSON.stringify(contractRead.data));
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <button onClick={ParticipantDetails} id="ParticipantDetails" style={{display: "none"}}>getParticipantDetails</button>
    )
}

export default ParticipantDetails