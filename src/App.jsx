import React, { FC, useMemo } from 'react';
import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'


import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css'; 
// import './App.css'
import { Airdrop } from './Airdrop';

function App() {

  return (

      <ConnectionProvider endpoint={import.meta.env.VITE_SOLANA_RPC_URL}>

        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton/>
            <WalletDisconnectButton/>

            
            <div>
              hi there <b>hellooo</b>
            </div>


            <Airdrop />
          </WalletModalProvider>
        </WalletProvider>

      </ConnectionProvider>
  )
}

export default App
