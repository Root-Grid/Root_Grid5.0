import React from 'react'
import {
    useContractRead,
} from "wagmi";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';

const ParticipantDetails = ({id}) => {

    let { data } = useContractRead({
        address: address?.address,
        abi: abi?.abi,
        functionName: "getParticipantDetails",
        args: [id]
    });

    // console.log(data);
    // console.log(typeof(data.balance));
    // localStorage.setItem("userDatails", JSON.stringify(data));

    
    const ParticipantDetails = async() => {
        try {
            localStorage.setItem("ParticipantDetails", contractRead.data);
            console.log(contractRead.data);
            // console.log(localStorage.ParticipantDetails);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <button onClick={ParticipantDetails}>getParticipantDetails</button>
    )
}

export default ParticipantDetails