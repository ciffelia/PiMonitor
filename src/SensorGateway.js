// @flow
const path = require('path');
const exec = require('child_process').exec;

class SensorGateway {
  static fetchData(cb: (any, any) => mixed) {
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
