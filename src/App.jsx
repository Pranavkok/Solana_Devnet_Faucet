import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import AirDrop from './AirDrop';
import { Route , Routes } from 'react-router-dom';
import SendToken from './SendToken';
import Layout from './Layout';

function App() {
  const rpc_url = import.meta.env.VITE_RPC_URL

  return (
    <div>
      <ConnectionProvider endpoint={rpc_url}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<AirDrop/>}></Route>
                <Route path='/send-token' element={<SendToken/>}></Route>
              </Routes>
            </Layout>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
