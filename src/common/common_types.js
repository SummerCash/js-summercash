const util = require('./common_bytes'); // Byte helpers
const {TextEncoder, TextDecoder} = require('text-encoding'); // Text encoder, decoder

/**
 * @author: Dowland Aiello
 * @exports
 */
class Address {
  /**
   * Creates an instance of Address.
   *
   * @param {Uint8Array} address
   */
  constructor(address) {
    let bodyAddress = address; // Set address

    if (!new TextDecoder('utf-8').decode(address).includes('0x')) {
      // Check no 0x
      bodyAddress = util.concatArrays(Hash.zeroX(), address); // Set hash with 0x
    }

    this.address = bodyAddress; // Set address
  }

  /**
   * Serializes address to string.
   *
   * @return {String} String value.
   */
  toString() {
    return '0x' + Buffer.from(this.address.slice(2, 20)).toString('hex');
  }
}

/**
 * @author: Dowland Aiello
 * @exports
 */
class Hash {
  /**
   * Creates an instance of Hash.
   *
   * @param {Uint8Array} hash
   */
  constructor(hash) {
    let bodyHash = hash; // Set hash

    if (!new TextDecoder('utf-8').decode(hash).includes('0x')) {
      // Check no 0x
      bodyHash = util.concatArrays(Hash.zeroX(), hash); // Set hash with 0x
    }

    this.hash = bodyHash; // Set hash
  }

  /**
   * Creates a new instance of Hash from a given hex value.
   * @param {String} s
   * @return {Hash} Constructed hash.
   */
  static fromString(s) {
    const hashBody = Buffer.from(s.slice(2, s.length)); // Decode hash body
    const hash = util.concatArrays(Hash.zeroX(), hashBody); // Concatenate hash parts

    return new this(hash); // Decode
  }

  /**
   * Serializes hash to string.
   *
   * @return {String} String value.
   */
  toString() {
    return '0x' + Buffer.from(this.hash).toString('hex'); // Return hex value
  }

  /**
   * Generates the standard 0x prefix as a byte array.
   *
   * @return {Uint8Array} Byte array value.
   */
  static zeroX() {
    return new TextEncoder().encode('0x'); // Encode
  }
}

module.exports = {
  Address: Address,
  Hash: Hash,
}; // Export address class
