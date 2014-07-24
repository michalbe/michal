'use strict';

var fs = require('fs');

module.exports = function(callback) {
  delete require.cache[require.resolve('../package.json')];
  var packageJsonStructure = require('../package.json');
  packageJsonStructure.scripts = {
    'test': 'node tests/' + packageJsonStructure.name + '-tests.js',
    'lint': 'node node_modules/jshint/bin/jshint .'
  };

  fs.writeFile(
    'package.json',
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
