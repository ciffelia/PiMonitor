const path = require('path');
const exec = require('child_process').exec;

module.exports = (cb) => {
  exec(path.join(__dirname, '..', 'pi-sensors'), (err, stdout, stderr) => {
    cb(err, JSON.parse(stdout));
  });
};

