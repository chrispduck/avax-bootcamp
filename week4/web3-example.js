Web3 = require("web3")
const web3 = new Web3('https://mainnet.infura.io/v3/700b0b4779594e01a186dfd73ee36157');


// connecting to local host
const ABI = require('factoryABI.txt');
const CONTRACT_ADDRESS = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95';
const myContract = new Web3.Contract(ABI, CONTRACT_ADDRESS);

// view and write calls


// Events
// Get past Events

// Contract Events

// Eth.subscriber