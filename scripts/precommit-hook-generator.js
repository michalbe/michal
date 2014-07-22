'use strict';

var exec = require('child_process').exec;

module.exports = function(callback) {
  exec(
    'npm install precommit-hook --save-dev',
    function(error, stdout, stderr) {
      if (error) {
        throw new Error('Cannot run `npm` commnds.');
      }
      callback(error, '`precommit-hook` & `jshint` installed');
    }
  );
};
