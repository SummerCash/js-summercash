const EC = require('elliptic').ec; // Elliptic curve lib
const ec = new EC('p521'); // Init elliptic curve lib
const fs = require('fs'); // File system
const resolve = require('path').resolve; // Path utils
const commonBytes = require('../common/common_bytes'); // Common bytes
const commonIO = require('../common/common_io'); // Common I/O
const {Address, Hash} = require('../common/common_types'); // Common types

/**
 * @author: Dowland Aiello
 * @exports
 */
class Account {
  /**
   * Creates a new account.
   */
  constructor() {
    const keyPair = ec.genKeyPair(); // Generate pair

    this.privateKey = keyPair.getPrivate(); // Get private
    this.publicKey = keyPair.getPublic(); // Get public
    this.address = new Address(
      commonBytes.concatArrays(Hash.zeroX(), this.publicKey.encode('array')),
    ); // Set address
  }

  /**
   * Write account to persistent memory.
   */
  writeToMemory() {
    fs.writeFileSync(
      resolve(
        `${commonIO.keystoreDir}/account_${this.address.toString()}.json`,
      ),
      JSON.stringify(this, null, 2),
    ); // Write file
  }

  static readFromMemory(address) {
    const json = fs.readFileSync(
      resolve(`${commonIO.keystoreDir}/account_${address.toString()}.json`),
    ); // Read JSON file

    return fromJSON(json); // Parse JSON
  }

  static fromJSON(json) {
    if (typeof json == 'string') json = JSON.parse(json); // Parse if not already

    let instance = new Account(); // Init new account

    instance.privateKey = json.privateKey; // Set private key
    instance.publicKey = json.publicKey; // Set public key
    instance.address = json.address; // Set address

    return instance; // Return instance
  }
}

module.exports = {
  Account: Account,
}; // Set module exports
