// @flow
const WebSocketServer = require('./WebSocketServer');
const RecordStore = require('./RecordStore');
const SensorGateway = require('./SensorGateway');

new RecordStore();

// Initialize WebSocket Server
const port = parseInt(process.env.PIMONITOR_WEBSOCKET_PORT)
const wss = new WebSocketServer(port);

setInterval(() => {
  SensorGateway.fetchData((err, data) => {
    if(err) throw err;
    wss.broadcast(JSON.stringify(data));
  });
}, 1000);
