import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const deployFundMe: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    console.log("HELLO IT WORKED")
}
export default deployFundMe
deployFundMe.tags = ["all", "fundMe"]
