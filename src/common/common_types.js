const util = require('./common_bytes'); // Byte helpers
const zeroX = new TextEncoder().encode('0x'); // Encode 0x

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
      bodyAddress = util.concatArrays(zeroX, hash); // Set hash with 0x
    }

    this.address = bodyAddress; // Set address
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
      bodyHash = util.concatArrays(zeroX, hash); // Set hash with 0x
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
    const hash = util.concatArrays(zeroX, hashBody); // Concatenate hash parts

    return new this(hash); // Decode
  }

  /**
   * Serializes hash to string.
   *
   * @return {String} String value.
   */
  string() {
    return this.hash.toString('hex'); // Return hex value
  }
}

module.exports = {
  Address: Address,
  Hash: Hash,
}; // Export address class
