import React from 'react'
import {
    useContractRead,
} from "wagmi";
import address from '../../../assets/contract_data/address.json';
import abi from '../../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';

const ParticipantDetails = ({id}) => {

    const contractRead = useContractRead({
        address: address?.address,
        abi: abi?.abi,
        functionName: "getParticipantDetails",
        args: [id]
    });

    
    const ParticipantDetails = async() => {
        try {
            console.log(contractRead.data);
            localStorage.setItem('ParticipantDetails', JSON.stringify(contractRead.data));
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <button onClick={ParticipantDetails}>getParticipantDetails</button>
    )
}

export default ParticipantDetails