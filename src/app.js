const firebaseAdmin = require("firebase-admin");
const CronJob = require('cron').CronJob;
const moment = require('moment');
const WebSocketServer = require('./webSocketServer.js');
const getSensorsData = require('./getSensorsData.js');

// Initialize Firebase Cloud Firestore
const serviceAccount = require('../firebase/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.PIMONITOR_FIREBASE_URL
});
const firestore = firebaseAdmin.firestore();

new CronJob('0 * * * * *', () => {
  getSensorsData((err, data) => {
    if(err) throw err;

    const now = moment({ seconds: 0, milliseconds: 0 }).local().toISOString();
    firestore.collection('records').doc(now).set(data)
  });
}, null, true);

// Initialize WebSocket Server
const wss = new WebSocketServer(process.env.PIMONITOR_WEBSOCKET_PORT);

setInterval(() => {
  getSensorsData((err, data) => {
    if(err) throw err;
    wss.broadcast(JSON.stringify(data));
  });
}, 1000);

