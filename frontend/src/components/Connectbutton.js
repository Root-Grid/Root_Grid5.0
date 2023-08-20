import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
    useContractWrite,
} from "wagmi";
import address from '../../assets/contract_data/address.json';
import abi from '../../assets/contract_data/abi.json';
import '@rainbow-me/rainbowkit/styles.css';

function Connectbutton() {
    const [isConnect, SetIsConnect] = useState(false)
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
        functionName: "registerParticipant",
    });

    let userInfo = localStorage.getItem('userInfo')
    let info = JSON.parse(userInfo)
    console.log(info.data._id)
    const registerUser = async () => {
        await registerWrite({ args: [info.data.name, info.data._id, "buyer", Date.now()] })
    }
    
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                SetIsConnect(true)
                                return (
                                    <button onClick={openConnectModal} type="button">
                                        Supercoin
                                    </button>
                                );
                            }

                            if (connected & isConnect) {
                                SetIsConnect(false)
                                registerUser()
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button>

                                    <button onClick={openAccountModal} type="button">
                                        {account.displayName}
                                        {account.displayBalance
                                            ? `(${account.displayBalance})`
                                            : ''}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default Connectbutton