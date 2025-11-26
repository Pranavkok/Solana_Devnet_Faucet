import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Balance from './Balance';

const AirDrop = () => {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount, setAmount] = useState(0);
    const [loader, setLoader] = useState(false);

    async function sendSol(){
        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }

        try {
            setLoader(true);
            await connection.requestAirdrop(
                wallet.publicKey, 
                amount * LAMPORTS_PER_SOL
            );
            alert("Air Dropped Success");
        } catch (error) {
            console.log(error);
            alert("Airdrop failed");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-2xl">
                {/* Wallet buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <Balance/>
                    <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700 !rounded-lg !px-4 sm:!px-6 !py-2 sm:!py-3 !font-semibold !transition-all !duration-300 !text-sm sm:!text-base" />
                    <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 !rounded-lg !px-4 sm:!px-6 !py-2 sm:!py-3 !font-semibold !transition-all !duration-300 !text-sm sm:!text-base" />
                </div>

                {/* Main card */}
                <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-purple-500 border-opacity-30">
                    {/* Heading */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse leading-tight">
                            SOLANA
                        </h1>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                            FAUCET
                        </h2>
                        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                            <div className="h-2 w-2 bg-purple-500 rounded-full animate-ping"></div>
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Wallet status */}
                    {wallet.publicKey && (
                        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-green-900 to-green-800 bg-opacity-30 rounded-lg border border-green-500 border-opacity-50">
                            <p className="text-green-400 text-xs sm:text-sm font-mono truncate">
                                <span className="font-bold">Connected:</span> {wallet.publicKey.toBase58()}
                            </p>
                        </div>
                    )}

                    {/* Input section */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-purple-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                                Enter Amount (SOL)
                            </label>
                            <input 
                                onChange={(e) => setAmount(Number(e.target.value))} 
                                type="number" 
                                placeholder="0.0"
                                className="w-full bg-black bg-opacity-50 border-2 border-purple-500 border-opacity-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white text-xl sm:text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300"
                                step="0.1"
                                min="0"
                            />
                            <p className="text-gray-400 text-xs mt-2">Max: 5 SOL per request on Devnet</p>
                        </div>

                        {/* Airdrop button */}
                        <button 
                            onClick={sendSol} 
                            disabled={loader || !wallet.publicKey || amount <= 0}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-base sm:text-xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:transform-none disabled:shadow-none relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                {loader ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="text-lg sm:text-xl">🚀</span>
                                        Request Airdrop
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Info section */}
                    <div className="mt-8 p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-500 border-opacity-30">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">ℹ️</span>
                            <div className="text-sm text-blue-300">
                                <p className="font-semibold mb-1">Devnet Faucet</p>
                                <p className="text-xs text-gray-400">This faucet provides test SOL on Solana Devnet. Tokens have no real value and are used for development purposes only.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>Powered by Solana Blockchain ⚡</p>
                </div>
            </div>
        </div>
    )
}

export default AirDrop