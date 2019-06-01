const {Address} = require('../common/common_types'); // Common
const {Transaction} = require('./transaction'); // Transaction

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
}
