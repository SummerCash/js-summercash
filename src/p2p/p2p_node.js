const PeerInfo = require('peer-info'); // Peer info
const Bundle = require('./p2p_bundle'); // Bundle

const bootstrapNodes = [
  '/ip4/108.41.124.60/tcp/3000/ipfs/Qmd9u7weuyGz7Ld3SdjrDuwtPKpTZ4AhJX7VookPkr7Gbw',
  '/ip4/108.41.124.60/tcp/3003/ipfs/QmVnW4u7Ejmfazmnd72JWrB3B9RGydX3V63mAUg9c1Y8Hg',
  '/ip4/174.129.191.246/tcp/3000/ipfs/QmUXThFht8qoZGdKLMVmr8Bk34VJ9oS3WWw3a25jeZucYd',
  '/ip4/54.234.2.165/tcp/3000/ipfs/Qma3QTswnKK48gzsaVhzakPApY4kPuBGsZLS1i837gns2s',
]; // Bootstrap nodes

createNode = callback => {
  PeerInfo.create((err, peerInfo) => {
    if (err) {
      // Check for errors
      return callback(err); // Run callback with error
    }

    const peerIdStr = peerInfo.id.toB58String(); // Get peer ID string value

    bootstrapNodes.forEach(node => {
      peerInfo.multiaddrs.add(node); // Add node
    }); // Setup bootstrap nodes

    const node = new Bundle(peerInfo); // Init node

    node.idStr = peerIdStr; // Set ID string

    callback(null, node); // Call callback
  });
};

module.exports = {
  bootstrapNodes: bootstrapNodes,
  createNode: createNode,
}; // Set exports
