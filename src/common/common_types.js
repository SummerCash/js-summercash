/**
 * @author: Dowland Aiello
 * @exports
 */
class Address {
  /**
   * Creates an instance of Address.
   *
   * @param {UInt8Array} address
   */
  constructor(address) {
    this.address = address; // Set address
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
   * @param {UInt8Array} hash
   */
  constructor(hash) {
    this.hash = hash; // Set hash
  }
}

module.exports = [Address, Hash]; // Export address class
