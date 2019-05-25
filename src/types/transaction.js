/**
 * @author: Dowland Aiello
 * @exports
 */
class Transaction {
  /**
   * Creates an instance of Transaction.
   *
   * @param {number} nonce
   * @param {Hash} parentHash
   * @param {Address} sender
   * @param {Address} recipient
   * @param {BigNumber} amount
   * @param {Int8Array} payload
   */
  constructor(nonce, parentHash, sender, recipient, amount, payload) {
    this.nonce = nonce; // Set nonce
    this.parentHash = parentHash; // Set parent hash
    this.sender = sender; // Set sender
    this.recipient = recipient; // Set recipient
    this.amount = amount; // Set amount
    this.payload = payload; // Set payload
    this.timestamp = Date.UTC(); // Set timestamp
  }
}

module.exports = Transaction; // Export transaction class
