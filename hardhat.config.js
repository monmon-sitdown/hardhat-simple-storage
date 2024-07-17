require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
//require("@nomiclabs/hardhat-etherscan"); 不需要这一行了
require("./tasks/block-number");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  networks: {
    ganache: {
      url: GANACHE_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1337,
    },
    localhardhat: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    //currency: "USD",
  },
};
