// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//Create a simple smart contract that manages a basic token system using Ethereum and Solidity.
//The contract should have the ability to create and issue tokens, as well as transfer tokens between accounts.


contract Token {
	// Create a mapping that allows the contract owner to check the balance of any account.
	mapping(address => uint) public balances;
	// Create a variable that allows the contract owner to check the total supply of tokens.
	address public minter;
	
	
	event Sent(address from, address to, uint amount);


	// Create a constructor that allows the contract owner to mint new tokens.
	constructor() {
		minter = msg.sender;
	}
	// Create a function that allows the contract owner to mint new tokens.
	function mint(address receiver, uint amount) public {
		
		require(msg.sender == minter);
		//require(msg.sender == minter, "Only the minter can mint new tokens.");
		require(amount < 1e60);
		//require(amount < 1e60, "Amount is too large.");
		balances[receiver] += amount;
	}
	
	// Create a function that allows the contract owner to transfer tokens to another account.
	function send(address receiver, uint amount) public {
		
		require(amount <= balances[msg.sender], "Insufficient balance.");
		
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		
		emit Sent(msg.sender, receiver, amount);
	}

	// Create a function that allows the contract owner to check the balance of any account.

	function balanceOf(address _owner) public view returns (uint balance) {
		return balances[_owner];
	}

	// Create a function that allows the contract owner to check the total supply of tokens.

	function totalSupply() public view returns (uint256) {
		return balances[minter];
	}

	// Create a function that allows the contract owner to check the total number of tokens in circulation.

	function totalCirculation() public view returns (uint256) {
		return balances[minter] - balances[address(0)];
	}

	// Create a function that allows the contract owner to check the total number of tokens that have been burned.

	function totalBurned() public view returns (uint256) {
		return balances[address(0)];
	}

	// Create a function that allows the contract owner to burn tokens.

	function burn(uint256 _value) public returns (bool success) {
		
		require(balances[msg.sender] >= _value);
		//require(balances[msg.sender] >= _value, "Insufficient balance.");
		balances[msg.sender] -= _value;
		balances[address(0)] += _value;
		return true;
	}

	// Create a function that allows the contract owner to check the total number of tokens that have been minted.

	function totalMinted() public view returns (uint256) {

	
		
		return balances[minter];
	}

	// Create a function that allows the contract owner to check the total number of tokens that have been transferred.

	function totalTransferred() public view returns (uint256) {
		return balances[minter] - balances[address(0)];
	}

	


}












