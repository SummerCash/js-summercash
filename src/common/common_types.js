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

  /**
   * Creates a new instance of Hash from a given hex value.
   * @param {String} s
   * @return {Hash} Constructed hash.
   */
  static fromString(s) {
    const encoder = new TextEncoder(); // Initialize encoder

    const hashBody = Buffer.from(s.slice(2, s.length)); // Decode hash body

    return this(encoder.encode('0x') + hashBody); // Decode
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

module.exports = [Address, Hash]; // Export address class
