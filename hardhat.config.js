require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

// hardhat-etherscan is used for verification of contract
require("@nomiclabs/hardhat-etherscan")

require("./tasks/block-number")

require("hardhat-gas-reporter")

require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const RINKBY_RPC_URL = process.env.RINKBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKET_CAP_KEY = process.env.COINMARKET_CAP_KEY
module.exports = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",
    networks: {
        rinkby: {
            url: RINKBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: [PRIVATE_KEY], already provided by hardhat
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_CAP_KEY,
        token: "MATIC",
    },
}
