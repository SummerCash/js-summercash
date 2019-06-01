const EC = require('elliptic').ec; // Elliptic curve lib
const sha3 = require('js-sha3').sha3_256; // Sha3
const {TextEncoder} = require('text-encoding'); // Text encoder, decoder
const {Hash, Address} = require('../common/common_types'); // Common types
const ec = new EC('p521'); // Init elliptic curve lib
const CommonBytes = require('../common/common_bytes'); // Common bytes
const BigNumber = require('bn.js'); // Big number

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
    this.timestamp = new Date(new Date().getTime()); // Set timestamp
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
    const key = ec.keyFromPrivate(privateKey); // Get keypair

    this.signature = {signature: ec.sign(this.hash.hash, privateKey)}; // Sign transaction, set signature

    this.signature.r = ec.getKeyRecoveryParam(
      this.hash.hash,
      this.signature.signature,
      key.getPublic(),
    ); // Set recovery
  }

  /**
   * Verify the contents of the transaction's signature.
   *
   * @return {Boolean} Signature validity.
   */
  verifySignature() {
    const key = ec.keyFromPublic(
      ec.recoverPubKey(
        this.hash.hash,
        this.signature.signature,
        this.signature.r,
      ),
    ); // Get key

    return key.verify(this.hash.hash, this.signature.signature); // Verify signature
  }

  /**
   * Convert given JSON input to transaction.
   *
   * @param {String | Object} json
   * @return {Transaction} Parsed tx.
   */
  static fromJSON(json) {
    if (typeof json == 'string') json = JSON.parse(json); // Parse if not already

    const copy = Object.assign({}, json); // Copy JSON

    let instance = copy; // Init instance

    if (json.parentHash) {
      // Check has parent hash
      instance.parentHash = new Hash(
        CommonBytes.dictToBytes(json.parentHash.hash),
      ); // Parse
    }

    instance.hash = new Hash(CommonBytes.dictToBytes(json.hash.hash)); // Parse
    instance.sender = new Address(CommonBytes.dictToBytes(json.sender.address)); // Parse
    instance.recipient = new Address(
      CommonBytes.dictToBytes(json.recipient.address),
    ); // Parse
    instance.signature = json.signature; // Set signature
    instance.amount = new BigNumber(instance.amount); // Parse amount
    instance.timestamp = new Date(json.timestamp); // Set timestamp

    return instance; // Return parsed
  }
}

module.exports = {
  Transaction: Transaction,
}; // Export transaction class
