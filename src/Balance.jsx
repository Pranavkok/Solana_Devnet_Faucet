import React, { useEffect, useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function Balance() {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const fetchBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(0);
            return;
        }
        try {
            setLoading(true);
            const bal = await connection.getBalance(publicKey);
            setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
            console.error("Failed to fetch balance", error);
            setBalance(0);
        } finally {
            setLoading(false);
        }
    }, [connection, publicKey]);

    useEffect(() => {
        if (publicKey) {
            fetchBalance();
        }
    }, [publicKey, fetchBalance]);

    return (
        <div className=" w-full justify-between flex items-center gap-2 bg-black bg-opacity-50 backdrop-blur-xl rounded-lg p-2 border border-purple-500 border-opacity-30 text-white font-semibold">
            <span>Balance: {balance.toFixed(4)} SOL</span>
            <button 
                onClick={fetchBalance}
                disabled={!publicKey || loading}
                className="p-1.5 rounded-md bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
            >
                {loading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg
  className="h-4 w-4 text-white"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M16.023 9.348h4.992v-4.992m-2.011-1.042a8.002 8.002 0 00-11.982 11.982m11.982-11.982a8.003 8.003 0 01-2.011 10.942M4.011 14.652H-.981v4.992m2.011 1.042a8.002 8.002 0 0011.982-11.982m-11.982 11.982a8.003 8.003 0 012.011-10.942"
  />
</svg>
                )}
            </button>
        </div>
    );
}

export default Balance;
