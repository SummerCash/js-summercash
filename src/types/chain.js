const {Address} = require('../common/common_types'); // Common
const {Transaction} = require('./transaction'); // Transaction
const fs = require('fs'); // File system
const resolve = require('path').resolve; // Path utils
const commonIO = require('../common/common_io'); // Common I/O
const commonBytes = require('../common/common_bytes'); // Common bytes

/**
 * @author: Dowland Aiello
 * @exports
 */
class Chain {
  /**
   * Creates a new intance of Chain.
   *
   * @param {Address} account
   */
  constructor(account) {
    this.account = account; // Set account
    this.transactions = []; // Set txs
  }

  /**
   * Append the given transaction to the working chain.
   *
   * @param {Transaction} transaction
   */
  addTransaction(transaction) {
    this.transactions.push(transaction); // Append transaction
  }

  /**
   * Write chain to persistent memory.
   */
  writeToMemory() {
    fs.writeFileSync(
      resolve(`${commonIO.chainDir}/chain_${this.account.toString()}.json`),
      JSON.stringify(this, null, 2),
    ); // Write to memory
  }

  /**
   * Read chain from persistent memory.
   *
   * @param {Address} account
   */
  static readFromMemory(account) {
    const json = fs.readFileSync(
      resolve(`${commonIO.chainDir}/chain_${account.toString()}.json`),
    ); // Read JSON file

    return Chain.fromJSON(JSON.parse(json)); // Return chain
  }

  /**
   * Convert given JSON input to chain.
   *
   * @param {String | Object} json
   * @return {Chain} Parsed chain.
   */
  static fromJSON(json) {
    if (typeof json == 'string') json = JSON.parse(json); // Parse if not already

    let instance = new Chain(); // Init chain

    instance.account = new Address(
      commonBytes.dictToBytes(json.account.address),
    ); // Parse account
    instance.transactions = []; // Set transactions

    json.transactions.forEach(element => {
      instance.transactions.push(Transaction.fromJSON(element)); // Append parsed tx
    });

    return instance; // Return instance
  }
}

module.exports = {
  Chain: Chain,
}; // Export chain class
