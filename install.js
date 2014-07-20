'use strict';

var exec = require('child_process').exec;
var async = require('async');
var fs = require('fs');

var packageJsonStructure = {
  name: "",
  version: "0.0.1",
  author: "",
  repository: ''
}


var parseGitCommand = function(instruction, cb) {
  var key = Object.keys(instruction)[0];
  var command = instruction[key];

  exec(command, function(error, stdout, stderr) {
    packageJsonStructure[key] = stdout.trim();
    cb();
  });
}

var gitConfigCommands = [
  { name: "(basename $(git rev-parse --show-toplevel))" },
  { author: "git log --all --format='%aN <%cE>' | sort -u | head -1" },
  { repository: "git config --get remote.origin.url" }
];

async.each(gitConfigCommands, parseGitCommand, function() {
  fs.writeFile("package.json", JSON.stringify(packageJsonStructure, null, 2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("package.json file saved...");
    }
  });
});
