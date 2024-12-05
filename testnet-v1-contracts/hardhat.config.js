require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    merlin: {
      url: "https://testnet-rpc.merlinchain.io",
      accounts: [PRIVATE_KEY],
    },
    bitlayer: {
      url: "https://testnet-rpc.bitlayer.org/",
      accounts: [PRIVATE_KEY],
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      accounts: [PRIVATE_KEY],
    },
  },
};
