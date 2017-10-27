const CronJob = require('cron').CronJob;
const moment = require('moment');
const firebaseAdmin = require("firebase-admin");
const SensorGateway = require('./SensorGateway');

class RecordStore {
  constructor() {
    const serviceAccount = require('../firebase/serviceAccountKey.json');
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: process.env.PIMONITOR_FIREBASE_URL
    });
    this.firestore = firebaseAdmin.firestore();
  
    new CronJob('0 * * * * *', this.minutelyTask.bind(this), null, true);
  }
  
  getCollection(time, unit) {
    switch(unit) {
      case 'minute':
        return this.getDocument(time, 'hour').collection('minute');
      case 'hour':
        return this.getDocument(time, 'date').collection('hour');
      case 'date':
        return this.getDocument(time, 'month').collection('date');
      case 'month':
        return this.getDocument(time, 'year').collection('month');
      case 'year':
        return this.firestore.collection('year');
      default:
        throw 'Argument unit is invalid:' + unit;
    }
  }
  
  getDocument(time, unit) {
    const timeDocName = (
      (unit === 'month')
        ? (time.month() + 1).toString()
        : time.get(unit).toString()
    );
    return this.getCollection(time, unit).doc(timeDocName);
  }
  
  addRecord(time, data) {
    this.getDocument(time, 'minute').set(data);
  }
  
  minutelyTask() {
    SensorGateway.fetchData((err, data) => {
      if(err) throw err;
      this.addRecord(moment(), data);
    });
  }
}

module.exports = RecordStore;
