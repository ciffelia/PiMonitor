const WebSocket = require('ws');

class WebSocketServer {
  constructor(port) {
    this.wss = new WebSocket.Server({
      port,
      clientTracking: true
    }, () => {
      console.log('WebSocket Server Listening at port ' + port);
    });

    this.wss.on('connection', (client, request) => {
      const clientAddress = request.socket.remoteAddress, clientPort = request.socket.remotePort;
      console.log(`New connection from ${clientAddress} (port ${clientPort})`);

      client.on('close', () => { console.log(`Connection from ${clientAddress} (port ${clientPort}) closed`) });
      client.on('error', () => { client.close() });
    });
  }
  
  broadcast(data) {
    for(const client of this.wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }
}

module.exports = WebSocketServer;
