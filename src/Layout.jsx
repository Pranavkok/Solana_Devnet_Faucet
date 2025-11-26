import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import Balance from './Balance';

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mb-6 sm:mb-8">
          {location.pathname === '/' ? (
            <Link to="/send-token" className="h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base w-full">Send Token</Link>
          ) : (
            <Link to="/" className="h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base w-full">Faucet</Link>
          )}
          <Balance />
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>

        {children}

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Solana Blockchain ⚡</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
