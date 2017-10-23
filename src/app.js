const path = require('path');
const exec = require('child_process').exec;
const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: process.env.PIMONITOR_WEBSOCKET_PORT,
  clientTracking: true
});

setInterval(() => {
  exec(path.join(__dirname, '..', 'pi-sensors'), (err, stdout, stderr) => {
    if(err) throw err;

    for(client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(stdout);
      }
    }
  });
}, 1000)

