const resolve = require('path').resolve; // Path utils

let config = {
  dataDir: resolve('./data'),
  keystoreDir: resolve(`${dataDir}/keystore`),
};

module.exports = {
  config: config,
}; // Set module exports
