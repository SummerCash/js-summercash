const sha3 = require('js-sha3').sha3_256; // Sha3

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
   * @param {Uint8Array} payload
   */
  constructor(nonce, parentHash, sender, recipient, amount, payload) {
    this.nonce = nonce; // Set nonce
    this.parentHash = parentHash; // Set parent hash
    this.sender = sender; // Set sender
    this.recipient = recipient; // Set recipient
    this.amount = amount; // Set amount
    this.payload = payload; // Set payload
    this.timestamp = Date.UTC(); // Set timestamp
    this.hash = sha3(this); // Set hash
  }

  /**
   * Serializes transaction to a Uint8Array.
   *
   * @return {Uint8Array} Serialized value.
   */
  bytes() {
    const encoder = new TextEncoder(); // Initialize text encoder

    return encoder.encode(JSON.stringify(this)); // Return encoded value
  }
}

module.exports = Transaction; // Export transaction class
