import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';
import {
    Transaction,
    Client,
    PrivateKey,
    AccountId,
} from "@hashgraph/sdk";
import * as readline from 'readline';


dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

async function signTransaction(base64TxString: string): Promise<string> {
    try {
        if (!process.env.HEDERA_PRIVATE_KEY) {
            throw new Error("HEDERA_PRIVATE_KEY not found in .env file");
        }

        if (!process.env.HEDERA_ACCOUNT_ID) {
            throw new Error("HEDERA_ACCOUNT_ID not found in .env file");
        }

        const privateKeyString = process.env.HEDERA_PRIVATE_KEY;
        const accountId = process.env.HEDERA_ACCOUNT_ID;

        // Create client based on environment variable
        const network = process.env.HEDERA_NETWORK || 'testnet';
        let client: Client;

        if (network === 'mainnet') {
            client = Client.forMainnet();
        } else if (network === 'testnet') {
            client = Client.forTestnet();
        } else if (network === 'previewnet') {
            client = Client.forPreviewnet();
        } else {
            throw new Error(`Invalid network: ${network}`);
        }

        // Set the operator account ID and private key
        const operatorId = AccountId.fromString(accountId);
        const operatorKey = PrivateKey.fromString(privateKeyString);
        client.setOperator(operatorId, operatorKey);

        console.log(`Using account: ${accountId} on ${network}`);

        // Convert base64 string back to bytes
        console.log("Converting base64 transaction to bytes...");
        const txBytes = Buffer.from(base64TxString, "base64");

        // Convert bytes to transaction object
        console.log("Deserializing transaction...");
        const transaction = Transaction.fromBytes(txBytes);

        // Sign with private key
        console.log("Signing transaction...");
        const signedTx = await transaction.sign(operatorKey);

        // Execute the transaction
        console.log("Executing transaction...");
        const txResponse = await signedTx.execute(client);

        // Get the receipt
        console.log("Getting transaction receipt...");
        const receipt = await txResponse.getReceipt(client);

        // Return the transaction ID and status
        return `Transaction executed with ID: ${txResponse.transactionId.toString()}\nStatus: ${receipt.status.toString()}`;
    } catch (error) {
        console.error("Error signing transaction:", JSON.stringify(error));
        throw error;
    }
}


async function main() {
    try {
        console.log("=== Hedera Transaction Signer CLI ===");
        console.log("This tool signs and executes Hedera transactions using a private key from .env file");
        console.log("Required .env variables:");
        console.log("  HEDERA_PRIVATE_KEY - Your private key");
        console.log("  HEDERA_ACCOUNT_ID - Your account ID");
        console.log("  HEDERA_NETWORK - Network to use (testnet, mainnet, previewnet) - defaults to testnet");
        console.log("=================================\n");

        const base64TxString = await askQuestion("Paste your base64-encoded transaction bytes here: ");

        if (!base64TxString || base64TxString.trim() === '') {
            console.error("No transaction bytes provided. Exiting.");
            process.exit(1);
        }

        const result = await signTransaction(base64TxString.trim());
        console.log("\nSuccess!");
        console.log(result);
    } catch (error) {
        console.error("\nError:", error);
    } finally {
        rl.close();
    }
}


main();