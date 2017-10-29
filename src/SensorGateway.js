// @flow
const path = require('path');
const exec = require('child_process').exec;

type SensorData = {
  cpu: {
    temperature: number
  },
  bme280: {
    temperature: number,
    pressure: number,
    humidity: number
  }
}

class SensorGateway {
  static fetchData(cb: (any, ?SensorData) => mixed) {
    exec(path.join(__dirname, '..', 'pi-sensors'), (err, stdout, stderr) => {
      if(err) {
        cb(err);
      } else {
        cb(null, JSON.parse(stdout));
      }
    });
  }
}

module.exports = SensorGateway;
