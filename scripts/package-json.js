'use strict';

var fs = require('fs');
var gi = require('git-info');
var path = process.cwd();

var packageJsonStructure = {
  name: '',
  version: '0.0.1',
  author: '',
  repository: ''
};

module.exports = function(callback){
  gi(['name', 'author', 'repository'], function(err, resp) {
    packageJsonStructure.name = resp.name;
    packageJsonStructure.author = resp.author;
    packageJsonStructure.repository = resp.repository;

    fs.writeFile(
      path + '/package.json',
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
