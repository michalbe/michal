'use strict';

var fs = require('fs');
var path = process.cwd();

module.exports = function(callback) {
  var name = require(path + '/package.json').name;
  var testFileMock = [
    '\'use strict\';',
    '',
    'var assert = require(\'assert\');',
    '//var ' + name + ' = require(\'../\');', // commented for linter
    '',
    '// test 1',
    'assert(true);'
  ];
  fs.mkdir(path + '/tests', function(err) {
    if(!err || err.code === 'EEXIST') {
      console.log('`tests` directory created...');
      fs.writeFile(
        path + '/tests/' + name + '-tests.js',
        testFileMock.join('\n'),
        function(file_err) {
          if(file_err) {
            callback(file_err);
          } else {
            callback(null, 'Simple test mock created....');
          }
      });

    } else {
      callback(err);
    }
  });
};
