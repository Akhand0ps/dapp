
import { useConnection, useWallet} from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const Airdrop = () => {

    const wallet = useWallet();

    const {connection} = useConnection();

    async function sendAirdropToUser(){

        console.log(wallet.publicKey.toString());

        try{
            
            if(!wallet.publicKey){
                alert("Wallet not connected");
                return;
            }
            const amount = document.getElementById("amount").value;
            // console.log(typeof amount);
            const parsedAmount = parseFloat(amount);
            
            if(!parsedAmount || isNaN(parsedAmount) || parsedAmount <=0  || parsedAmount > 2){
                alert("Invalid amount");
                return;
            }



            //sign the airdrop transaction
            const signature = await connection.requestAirdrop(wallet.publicKey,parsedAmount * LAMPORTS_PER_SOL);

            console.log(parsedAmount * LAMPORTS_PER_SOL);

            console.log("Airdrop signature:", signature);
            alert("Airdrop Requested. Waiting for confirmation...");


            //get the latest blockhash


             const lastestBlockHash = await connection.getLatestBlockhash();

            const confirmation = await connection.confirmTransaction(
                {
                    signature,
                    blockhash: lastestBlockHash.blockhash,
                    latestValidBlockHeight: lastestBlockHash.lastValidBlockHeight
                },
                "confirmed"
            );

            if(confirmation.value.err){
                throw new Error("Transaction failed: "+confirmation.value.err);
            }

            //ye purana ho gya hai 
            // const confirmation = await connection.confirmTransaction(signature,'confirmed');

            // if(confirmation.value.err){
            //     throw new Error("Transaction failed: " + confirmation.value.err);
            // }


            alert("Airdrop Sent Successfully");

        }catch(err){
            console.error("Airdrop failed:", err);
        }
    }

    
    return (
        <div>
            
           {/* hi {wallet.publicKey.toString()} */}

            <input id="amount" type="text" placeholder="Amount"></input>
            <button onClick={sendAirdropToUser}>Send Airdrop</button>
            <br />


        </div>
    )

}