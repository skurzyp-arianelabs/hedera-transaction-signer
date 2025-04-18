# HashConnect Signer

A command-line utility for signing and executing Hedera transactions using a private key. This tool allows developers to easily sign base64-encoded transaction bytes and execute them on the Hedera network.

## Features

- Sign Hedera transactions with a private key
- Execute transactions on Hedera Mainnet, Testnet, or Previewnet
- Simple command-line interface
- Support for ECDSA and ED25519 key types

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd hashconnect-signer
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   pnpm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
HEDERA_ACCOUNT_ID="0.0.XXXXX"
HEDERA_PRIVATE_KEY="your-private-key"
HEDERA_NETWORK=testnet  # Options: testnet, mainnet, previewnet
HEDERA_KEY_TYPE="ECDSA" # Optional: ECDSA or ED25519
```

### Environment Variables

- `HEDERA_ACCOUNT_ID`: Your Hedera account ID
- `HEDERA_PRIVATE_KEY`: Your private key for signing transactions
- `HEDERA_NETWORK`: The Hedera network to use (testnet, mainnet, or previewnet)
- `HEDERA_KEY_TYPE`: The type of key being used (ECDSA or ED25519)

## Usage

1. Run the application:
   ```
   npm start
   ```
   or in development mode:
   ```
   npm run dev
   ```

2. When prompted, paste your base64-encoded transaction bytes.

3. The application will:
   - Decode the transaction bytes
   - Sign the transaction with your private key
   - Execute the transaction on the specified Hedera network
   - Display the transaction ID and status

Example:
```
=== Hedera Transaction Signer CLI ===
This tool signs and executes Hedera transactions using a private key from .env file
Required .env variables:
  HEDERA_PRIVATE_KEY - Your private key
  HEDERA_ACCOUNT_ID - Your account ID
  HEDERA_NETWORK - Network to use (testnet, mainnet, previewnet) - defaults to testnet
=================================

Paste your base64-encoded transaction bytes here: [paste your base64 string]

Using account: 0.0.XXXXX on testnet
Converting base64 transaction to bytes...
Deserializing transaction...
Signing transaction...
Executing transaction...
Getting transaction receipt...

Success!
Transaction executed with ID: 0.0.XXXXX@1681234567.890000000
Status: SUCCESS
```

## Development

- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled application
- `npm run dev`: Run the application in development mode with ts-node

## Dependencies

- [@hashgraph/sdk](https://github.com/hashgraph/hedera-sdk-js): Hedera JavaScript SDK
- [hashconnect](https://github.com/Hashpack/hashconnect): HashConnect library for Hedera wallet connections
- [dotenv](https://github.com/motdotla/dotenv): For loading environment variables

## Security Notes

- Never share your private key or commit your `.env` file to version control
- This tool is intended for development and testing purposes
- Always verify transaction details before signing

## License

ISC