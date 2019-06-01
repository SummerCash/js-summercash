const {resolve} = require('path'); // Path utils
const fs = require('fs'); // File system

var dataDir = getDir('./data'); // Data dir
var keystoreDir = getDir(`${dataDir}/keystore`); // Keystore dir
var dbDir = getDir(`${dataDir}/db`); // Db dir
var chainDir = getDir(`${dbDir}/chain`); // Chain dir

/**
 * Get the working dir.
 *
 * @param {String} base
 */
function getDir(base) {
  if (!fs.existsSync(base)) {
    // Check not exist
    fs.mkdirSync(base); // Make base dir
  }

  return resolve(base); // Resolve dir
}

module.exports = {
  dataDir: dataDir,
  keystoreDir: keystoreDir,
  dbDir: dbDir,
  chainDir: chainDir,
}; // Set module exports
