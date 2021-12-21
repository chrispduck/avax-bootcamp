require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// module.exports = {
//   defaultNetwork: 'ganache',
//   networks: {
//     ganache: {
//       // change URL to the URL from your Ganache. See README if the port is not 8545.
//       url: 'http://127.0.0.1:8545',
//       gasLimit: 6000000000,
//       defaultBalanceEther: 1000,
//     },
//   },
//   solidity: '0.8.0',
// };

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "fork",
  networks: {
    fork: {
      url: "http://127.0.0.1:8545",
      // initialBaseFeePerGas: 0,
      // initialBaseFeePerGas:
      blockGasLimit: "100_000_000_000"
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 6.4,
    coinmarketcap: process.env.COINMARKETCAP_API
  }
};