'use strict';

var exec = require('child_process').exec;

module.exports = function(callback) {
  exec(
    'npm install assert --save-dev',
    function(error, stdout, stderr) {
      if (error) {
        throw new Error('Cannot run `npm` commands.');
      }
      callback(error, '`assert` package installed');
    }
  );
};
