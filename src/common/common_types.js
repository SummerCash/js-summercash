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
   * @param {Uint8Array} hash
   */
  constructor(hash) {
    this.hash = hash; // Set hash
  }
}

module.exports = [Address, Hash]; // Export address class
