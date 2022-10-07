// imports

// const ethers = require("ethers");
// const { getJsonWalletAddress } = require("ethers/lib/utils");
// const fs = require("fs-extra");
// require("dotenv").config();

import { ethers } from "hardhat";

// async main

async function main() {

  // We get the contract to deploy
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log("Simple Storage deployed to:", simpleStorage.address)

}

// call main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
