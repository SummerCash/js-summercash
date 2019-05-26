const {resolve} = require('path'); // Path utils
const fs = require('fs'); // File system

var dataDir = getDir('./data'); // Data dir
var keystoreDir = getDir(`${dataDir}/keystore`); // Keystore dir

// get working data dir.
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
}; // Set module exports
