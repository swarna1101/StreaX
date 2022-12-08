// This file is used to deploy the contract to the Rinkeby test network
const HDWalletProvider = require('@truffle/hdwallet-provider');
// HDWalletProvider is a module that allows us to connect to a network using a mnemonic
const Web3 = require('web3');

// Import the ABI and bytecode from the compile.js file

const { interface, bytecode } = require('./compile');

// Create an instance of Web3

const provider = new HDWalletProvider(
	'REPLACE_WITH_YOUR_MNEMONIC',
	// remember to change this to your own phrase!
	'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
	// remember to change this to your own endpoint!
);

// Create an instance of Web3
const web3 = new Web3(provider);

// Create a function that deploys the contract

const deploy = async () => {
	// Get a list of all accounts
	const accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract

	console.log('Attempting to deploy from account', accounts[0]);

	// Deploy the contract

	const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode }).send({ gas: '1000000', from: accounts[0] });

	// Print the address of the contract

	console.log('Contract deployed to', result.options.address);
	// Stop the provider
	provider.engine.stop();

	// 0x5FbDB2315678afecb367f032d93F642f64180aa3
};

// Call the deploy function
deploy();
