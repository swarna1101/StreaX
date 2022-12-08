const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

// Tests for the Token contract

// List of accounts
let accounts;
// Instance of the contract
let token;

// Run the tests
beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract

	token = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })

		.send({ from: accounts[0], gas: '1000000' });
});

describe('Token', () => {
	// Test for the deployment of the contract
	it('deploys a contract', () => {
		assert.ok(token.options.address);
	});

	// Test for the name of the token
	it('has a name', async () => {
		const name = await token.methods.name().call();
		assert.equal(name, 'Token');
	});

	// Test for the symbol of the token

	it('has a symbol', async () => {
		const symbol = await token.methods.symbol().call();
		assert.equal(symbol, 'TKN');
	});

	// Test for the initial supply of the token

	it('has an initial supply', async () => {
		const totalSupply = await token.methods.totalSupply().call();
		assert.equal(totalSupply, 1000000);
	});

	it('assigns the initial supply to the creator', async () => {
		const balance = await token.methods.balanceOf(accounts[0]).call();
		assert.equal(balance, 1000000);
	});

	// Test for the transfer of tokens

	it('allows transfer of tokens', async () => {
		await token.methods.transfer(accounts[1], 100).send({ from: accounts[0] });
		const balance = await token.methods.balanceOf(accounts[1]).call();
		assert.equal(balance, 100);
	});

	// Test for the approval of tokens

	it('allows approval of tokens', async () => {
		await token.methods.approve(accounts[1], 100).send({ from: accounts[0] });
		const allowance = await token.methods.allowance(accounts[0], accounts[1]).call();
		assert.equal(allowance, 100);
	});

	// Test for the transfer of tokens from one account to another

	it('allows transfer of tokens from one account to another', async () => {
		await token.methods.transfer(accounts[1], 100).send({ from: accounts[0] });
		await token.methods.approve(accounts[2], 100).send({ from: accounts[1] });
		await token.methods.transferFrom(accounts[1], accounts[2], 100).send({ from: accounts[2] });
		const balance = await token.methods.balanceOf(accounts[2]).call();
		assert.equal(balance, 100);
	});
});
