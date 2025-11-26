import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

const SendToken = () => {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount, setAmount] = useState(0);
    const [address,setAddress] = useState("");
    const [loader, setLoader] = useState(false);

    async function sendSol(){
        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }

        try {
            setLoader(true);
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey (address),
                    lamports: amount * 1000000000,
                })
            )
            await wallet.sendTransaction(transaction,connection);
            alert(`Sent ${amount} SOL to ${address} Successfully`)
        } catch (error) {
            console.log(error);
            alert("Error" + error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-purple-500 border-opacity-30">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse leading-tight">
                        SOLANA
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                            SEND SOL
                    </h2>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
                        <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                        <div className="h-2 w-2 bg-purple-500 rounded-full animate-ping"></div>
                        <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    </div>
                </div>

                {wallet.publicKey && (
                    <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-green-900 to-green-800 bg-opacity-30 rounded-lg border border-green-500 border-opacity-50">
                        <p className="text-green-400 text-xs sm:text-sm font-mono truncate">
                            <span className="font-bold">Connected:</span> {wallet.publicKey.toBase58()}
                        </p>
                    </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-purple-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                            Enter a Address
                        </label>
                        <input 
                            onChange={(e) => setAddress(e.target.value)} 
                            type="text" 
                            placeholder="0x....."
                            className="w-full bg-black bg-opacity-50 border-2 border-purple-500 border-opacity-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white text-xl sm:text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300"
                        />
                        <p className="text-gray-400 text-xs mt-2">enter the correct address to whom you want to send SOL</p>
                    </div>
                    <div>
                        <label className="block text-purple-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                            Enter a Amount
                        </label>
                        <input 
                            onChange={(e) => setAmount(Number(e.target.value))} 
                            type="Number" 
                            placeholder="0.00"
                            className="w-full bg-black bg-opacity-50 border-2 border-purple-500 border-opacity-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white text-xl sm:text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300"
                            min={0}
                        />
                        <p className="text-gray-400 text-xs mt-2">min amount should be greater than 0</p>
                    </div>

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
                                   Send SOL
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SendToken