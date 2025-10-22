
# dapp

A minimal React + Vite frontend demonstrating a Solana devnet airdrop flow using `@solana/web3.js` and the Solana Wallet Adapter UI.

This repository contains a small example app that lets you connect a wallet and request a devnet airdrop from an RPC endpoint.

## Project layout

- `src/App.jsx` — App root. Connects to an RPC endpoint and mounts wallet UI and the `Airdrop` component.
- `src/Airdrop.jsx` — UI and logic that requests a devnet airdrop and confirms the transaction.
- `src/main.jsx`, `src/index.css`, `src/App.css` — React entry and styles.
- `public/` — Static assets served by Vite.

## Prerequisites

- Node.js (18+ recommended)
- npm (or pnpm / yarn)
- Internet access to reach the RPC endpoint (the project is configured to use an Alchemy devnet URL by default)

## Install

Open a terminal at the project root and run:

```bash
npm install
```

## Run (development)

Start the dev server:

```bash
npm run dev
```

Open the URL printed by Vite (defaults to `http://localhost:5173`) in your browser.

## Usage — Requesting a devnet airdrop

1. Click the wallet button to connect a wallet. The UI uses `@solana/wallet-adapter-react-ui` components.
2. In the airdrop input, enter the amount of SOL you want to request (whole numbers expected by the current UI).
3. Click "Send Airdrop". The app converts the SOL amount to lamports (1 SOL = 1,000,000,000 lamports) and calls `connection.requestAirdrop`.

Important notes:
- Devnet imposes per-request and per-wallet limits (commonly 1–2 SOL). If you request more than the provider allows, the RPC may return a signature while the transaction fails on-chain.
- The current `Airdrop` implementation uses a simple confirmation call which may be deprecated on some RPC providers; see Troubleshooting below.

## Troubleshooting

If you get a 200 OK and a signature from the RPC but later see an explorer message like:

```
Program Error: "Instruction #1 Failed"
```

Check the following:

- Airdrop amount: Try requesting `1` SOL first. Requests above the provider limit (often 2 SOL) will fail.
- Daily or rate limits: A wallet may hit airdrop limits for the day. Try a fresh wallet or wait.
- RPC provider throttling: Switch to another devnet RPC (for example `https://api.devnet.solana.com`) if you suspect rate limits.
- Confirmation pattern: The simple `connection.confirmTransaction(signature)` can be unreliable. Consider polling `getSignatureStatus` or using `confirmTransaction` with a commitment and timeout. Example pattern (pseudocode):

```js
// after requestAirdrop -> signature
const {value} = await connection.getSignatureStatus(signature);
// poll or wait for confirmed/finalized with a timeout
```

## Development notes & next steps

- Populate the `wallets` array in `src/App.jsx` with wallet adapters you want to support (UnsafeBurner is imported but not used).
- Improve `Airdrop` UX: validate and clamp amounts, disable the button while waiting, show progress, and display RPC error details to the user.
- Replace deprecated confirmation calls with a robust confirmation + timeout helper.
- Add small unit/integration tests that mock `connection` for the `Airdrop` logic.

## Where to look in the code

- Airdrop logic: `src/Airdrop.jsx`
- RPC endpoint configuration: `src/App.jsx` (currently set to an Alchemy devnet URL)

## License

Provided as-is for learning and experimentation.
