"use client";
import './globals.css'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: "NcrmX9FX3r9Va-W1PEpdzXv9AmlgHtZ3" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '0d7bcb2dedf7781ff2cbc9ef29f0a4f6',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

// export const metadata = {
//   title: 'RootKart',
//   description: 'Grid 5.0',s
// }

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}

export default RootLayout;