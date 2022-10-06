// const ethers = require("ethers");
// const { getJsonWalletAddress } = require("ethers/lib/utils");
// const fs = require("fs-extra");
// require("dotenv").config();

import { ethers } from "ethers"
import * as fs from "fs-extra" //used to read bin and abi files
import "dotenv/config"

async function main() {
    
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!) //this is the way the script connects to the blockchain
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider) //actual wallet creation with a private key to sign transactions with

    // Changing the way to get the wallet with encypted key
    // const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf-8"); //reads the file and stores it into this variable
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD); //returns a wallet object
    // wallet = await wallet.connect(provider); //connecting the wallet back to the provider

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8") //synchronously reading abi
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8") //synchronously reading bin 

    //object used to deploy contracts (abi so the code knows how to interact with contract, binary = compiled code, wallet = sign transaction)
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying please wait . . .")

    const contract = await contractFactory.deploy() //STOP here! Wait for contract to deploy. Returns a promise that resolves to a contract.
    // const transactionReceipt = await contract.deployTransaction.wait(1) //only get a transaction receipt when waiting for a block confirmation
    // console.log(transactionReceipt)
    await contract.deployTransaction.wait(1)
    console.log(`Contract deployed to ${contract.address}`)

    // Get Number
    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`) //use strings instead, because js has a rather hard time with decimals 
    console.log("Updating favorite number...")
    // Set Number
    const transactionResponse = await contract.store("7") //Ether is smart enough to know this 7 string is actually the number 7
    const transactionReceipt = await transactionResponse.wait()
    // Get New Number
    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`Updated favorite number is: ${updatedFavoriteNumber}`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
