'use strict';

var exec = require('child_process').exec;
var path = process.cwd();

module.exports = function(callback) {
  exec(
    'cd ' + path + ';npm install precommit-hook --save-dev',
    function(error, stdout, stderr) {
      if (error) {
        throw new Error('Cannot run `npm` commnds.');
      }
      callback(error, '`precommit-hook` & `jshint` installed');
    }
  );
};
