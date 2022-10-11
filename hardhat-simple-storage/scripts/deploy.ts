// imports

// const ethers = require("ethers");
// const { getJsonWalletAddress } = require("ethers/lib/utils");
// const fs = require("fs-extra");
// require("dotenv").config();

import { ethers, run, network } from "hardhat"
import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"

// async main

async function main() {
    // We get the contract to deploy
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")

    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log("Simple Storage deployed to:", simpleStorage.address)

    //if on testnet, verify contract
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes ... ")
        await simpleStorage.deployTransaction.wait(6) //wait six blocks before verifying below
        await verify(simpleStorage.address, [])
    }

    //Get current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)
    //Update current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

// call main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
