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
}

module.exports = {
  Account: Account,
}; // Set module exports
