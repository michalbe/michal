'use strict';

var fs = require('fs');
var path = process.cwd();

module.exports = function(options, callback) {
  delete require.cache[require.resolve(path + '/package.json')];
  var packageJsonStructure = require(path + '/package.json');

  if (options['no-test']) {
    packageJsonStructure.scripts = {
      'build': 'rollup -c',
      'dev': 'rollup -c -w'
    };
  } else {
    packageJsonStructure.scripts = {
      'test': 'node tests/' + packageJsonStructure.name + '-tests.js',
      'build': 'rollup -c',
      'dev': 'rollup -c -w'
    };
  }


  fs.writeFile(
    path + '/package.json',
    JSON.stringify(packageJsonStructure, null, 2),
    function(err) {
      if(err) {
        callback(err);
      } else {
        callback(null, 'package.json updated with proper `scripts`...');
      }
    }
  );
};
