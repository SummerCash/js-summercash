const EC = require('elliptic').ec; // Elliptic curve lib
const sha3 = require('js-sha3').sha3_256; // Sha3
const {TextEncoder} = require('text-encoding'); // Text encoder, decoder
const {Hash} = require('../common/common_types'); // Common types
const ec = new EC('p521'); // Init elliptic curve lib

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
    this.hash = new Hash(new Uint8Array(sha3.arrayBuffer(this.bytes()))); // Set hash
    this.contractCreation = false; // Set contract creation
  }

  /**
   * Serializes transaction to a Uint8Array.
   *
   * @return {Uint8Array} Serialized value.
   */
  bytes() {
    return new TextEncoder().encode(JSON.stringify(this, null, 2)); // Return encoded value
  }

  /**
   * Sign transaction with given private key.
   *
   * @param {BigNumber} privateKey
   */
  sign(privateKey) {
    this.signature = ec.sign(this.hash.hash, privateKey); // Sign transaction, set signature
  }

  /**
   * Verify the contents of the transaction's signature.
   *
   * @return {Boolean} Signature validity.
   */
  verifySignature() {
    const key = ec.keyFromPublic(this.sender.address.slice(2, 20)); // Get key

    return key.verify(this.hash.hash, this.signature); // Verify signature
  }
}

module.exports = {
  Transaction: Transaction,
}; // Export transaction class
