const hre = require('hardhat');
// var Contract = require('web3-eth-÷contract');
var web3 = new Web3('http://localhost:8545');
// connecting to local host
const ABI = require('../artifacts/contracts/VolcanoCoin.sol/VolcanoCoin.json');
// read a balance 
const CONTRACT_ADDRESS = '../contract/VolcanoCoin.sol';
const myContract = new Contract(ABI, CONTRACT_ADDRESS);