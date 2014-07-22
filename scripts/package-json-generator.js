'use strict';

var exec = require('child_process').exec;
var async = require('async');
var fs = require('fs');

var packageJsonStructure = {
  name: '',
  version: '0.0.1',
  author: '',
  repository: ''
};


var parseGitCommand = function(instruction, cb) {
  var key = Object.keys(instruction)[0];
  var command = instruction[key];

  exec(command, function(error, stdout, stderr) {
    if (error) {
      throw new Error('Cannot run `git` commnds. Something goes wrong');
    }
    packageJsonStructure[key] = stdout.trim();
    cb();
  });
};

var gitConfigCommands = [
  { name: '(basename $(git rev-parse --show-toplevel))' },
  { author: 'git log --all --format=\'%aN <%cE>\' | sort -u | head -1' },
  { repository: 'git config --get remote.origin.url' }
];

module.exports = function(callback){
  async.each(gitConfigCommands, parseGitCommand, function() {
    fs.writeFile(
      'package.json',
      JSON.stringify(packageJsonStructure, null, 2),
      function(err) {
        if(err) {
          callback(err);
        } else {
          callback(null, 'package.json file saved...');
        }
      }
    );
  });
};
