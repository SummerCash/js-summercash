const libp2p = require('libp2p'); // Libp2p
const WebSocketStar = require('libp2p-websocket-star'); // Websockets
const KadDHT = require('libp2p-kad-dht'); // KadDHT

/**
 * @author: Dowland Aiello
 */
class Bundle extends libp2p {
  constructor(peerInfo) {
    const wstar = new WebSocketStar(); // Init websocket star

    const modules = {
      transport: [wstar],
      discovery: [wstar.discovery],
      DHT: KadDHT,
    }; // Set modules

    super(modules, peerInfo); // Call super
  }
}
