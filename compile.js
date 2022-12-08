// This file compiles the contract and exports the ABI and bytecode
const path = require('path');
// Path is a node module that allows us to work with file paths
const fs = require('fs');
// fs is a node module that allows us to work with the file system
const solc = require('solc');

// Path to the contract

const tokenPath = path.resolve(__dirname, 'contracts', 'token.sol');

// Read the contract
const source = fs.readFileSync(tokenPath, 'utf8');

// Compile the contract

module.exports = solc.compile(source, 1).contracts[':Token'];
