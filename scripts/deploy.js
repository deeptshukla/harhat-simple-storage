// imports
// run is used for running any hardhat task
// network provides network configurations and providers etc
const { ethers, run, network } = require("hardhat")

// async main
const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    const deployed = await SimpleStorage.deployed()
    console.log(SimpleStorage.address)
    // console.log(network.name)
    // console.log(network.config)
    chainId = network.config.chainId
    if (chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 6 block confirmations ...")
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    } else {
        console.log("Verification skipped")
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`current value is ${currentValue}`)
    const transactionResponse = await SimpleStorage.store(26)
    transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated value is ${updatedValue}`)

    console.log()
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log(`Already verified. log is ${error.message}`)
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
