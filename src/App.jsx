// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import AirDrop from './AirDrop';

function App() {
  const rpc_url = import.meta.env.VITE_RPC_URL

  return (
    <div>
      <ConnectionProvider endpoint={rpc_url}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className='w-full h-full'><AirDrop/></div>
                {/* <AirDrop/> */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
