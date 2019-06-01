const {Address} = require('../common/common_types'); // Common
const {Transaction} = require('./transaction'); // Transaction
const fs = require('fs'); // File system
const resolve = require('path').resolve; // Path utils
const commonIO = require('../common/common_io'); // Common I/O

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
      resolve(
        `${commonIO.chainDir}/chain_${this.account.address.toString()}.json`,
      ),
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
      resolve(`${commonIO.keystoreDir}/account_${address.toString()}.json`),
    ); // Read JSON file

    return JSON.parse(json); // Return chain
  }
}

module.exports = {
  Chain: Chain,
}; // Export chain class
