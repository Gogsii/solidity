// const ethers = require("ethers");
// const { getJsonWalletAddress } = require("ethers/lib/utils");
// const fs = require("fs-extra");
// require("dotenv").config();

import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

async function main() {
  //this is the way the script connects to the blockchain
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf-8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying please wait . . .");

  const contract = await contractFactory.deploy();

  // const contract = await contractFactory.deploy({
  //   gasLimit: 15000,

  // });

  const deploymentReceipt = await contract.deployTransaction.wait(1);

  console.log(`Contract deployed to ${contract.address}`);

  // Get Number
  let currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  console.log("Updating favorite number...");

  let transactionResponse = await contract.store("7");
  let transactionReceipt = await transactionResponse.wait();
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is: ${updatedFavoriteNumber}`);

  // console.log("Updating favorite number...");

  // let transactionResponse = await contract.store(7);
  // let transactionReceipt = await transactionResponse.wait();
  // currentFavoriteNumber = await contract.retrieve();
  // console.log(`New Favorite Number: ${currentFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
