import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { CiDeliveryTruck } from "react-icons/ci"
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight, BiSolidCoinStack } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import Connectbutton from "./Connectbutton";
import { useAccount, useContractRead } from "wagmi";

import contract_abi from "../../assets/contract_data/abi.json"
import contract_address from "../../assets/contract_data/address.json"

import ParticipantDetails from "./ContractFunctions/ParticipantDetails";
import RegisterParticipant from "./ContractFunctions/RegisterParticipant";

const Header = () => {
    const { address } = useAccount();
    const [data, setData] = useState({});

    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);

    const userData = localStorage.getItem('userInfo');
    const role = localStorage.getItem('role')
    const info = JSON.parse(userData);

    const id = info?.data?._id;
    console.log("Id", id);
    
    const {
        data: userDetails,
    } = useContractRead({
        address: contract_address?.address,
        abi: contract_abi?.abi,
        functionName: "getParticipantDetails",
        args: [id]
    });

    useEffect(() => {
        setData({Details: userDetails})
        console.log("Success",(data));
    }, [id])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <header
            className={`w-full h-[50px] md:h-[80px] bg-blue-500 flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
        >
            <Wrapper className="h-[60px] flex justify-between items-center">
                <Link href="/" className="flex">
                    <img src="/root1.png" className="w-[20px] md:w-[30px]" />
                    <span className="font-medium">Kart</span>
                </Link>

                <Menu
                    showCatMenu={showCatMenu}
                    setShowCatMenu={setShowCatMenu}
                />

                {mobileMenu && (
                    <MenuMobile
                        showCatMenu={showCatMenu}
                        setShowCatMenu={setShowCatMenu}
                        setMobileMenu={setMobileMenu}
                    />
                )}

                <div className="flex items-center gap-2 text-white">
                    {/* Icon start */}
                    <Link href="/user/supercoin">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BiSolidCoinStack className="text-[19px] md:text-[24px]" />
                            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                {Number(data.Details?.balance)}
                            </div>
                        </div>
                    </Link>
                    {/* Icon end */}

                    {/* Icon start */}
                    <Link href="/user/order-history">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <CiDeliveryTruck className="text-[15px] md:text-[20px]" />
                            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                {data.Details?.history?.length}
                            </div>
                        </div>
                    </Link>
                    {/* Icon end */}

                    {/* Mobile icon start */}
                    <div className="w-8md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {mobileMenu ? (
                            <VscChromeClose
                                className="text-[16px]"
                                onClick={() => setMobileMenu(false)}
                            />
                        ) : (
                            <BiMenuAltRight
                                className="text-[20px]"
                                onClick={() => setMobileMenu(true)}
                            />
                        )}
                    </div>
                    {/* Mobile icon end */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <Connectbutton />
                        </div>
                        {address && (!address || !data) ?
                            <div>
                                <RegisterParticipant name={info.data.name} id={info.data._id} role={role} timestamp={Date.now()} />
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default Header;
