# Solana Faucet

This project is a simple Solana faucet that allows users to airdrop devnet SOL to their wallets and send SOL to other wallets. It is a React application built with Vite and uses the Solana wallet adapter for wallet connectivity.

## What the project does

The Solana Faucet provides a user-friendly interface for interacting with the Solana devnet. It allows users to:

- Connect their Solana wallet.
- Airdrop devnet SOL to their connected wallet.
- Send devnet SOL to any Solana address.

## Why the project is useful

This project is useful for developers who are building and testing applications on the Solana devnet. It provides a simple and convenient way to get devnet SOL without having to use the command line or other more complex tools.

## How users can get started

To get started with this project, you will need to have Node.js and npm installed.

1.  Clone the repository:

    ```bash
    git clone https://github.com/Pranavkok/Solana_Devnet_Faucet.git
    ```

2.  Install the dependencies:

    ```bash
    cd solana-faucet
    npm install
    ```

3.  Create a `.env` file in the root of the project and add the following environment variable:

    ```
    VITE_RPC_URL=https://api.devnet.solana.com
    ```

4.  Start the development server:

    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` to use the faucet.

## Where users can get help

For help with this project, please open an issue on the GitHub repository.

## Who maintains and contributes

This project is maintained by the project owner. Contributions are welcome! Please open a pull request with any changes.