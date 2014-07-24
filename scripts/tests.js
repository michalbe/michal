'use strict';

var fs = require('fs');

module.exports = function(callback) {
  var name = require('../package.json').name;
  var testFileMock = [
    '\'use strict\';',
    '',
    'var assert = require(\'assert\');',
    'var ' + name + ' = require(\'../\');',
    '',
    '// test 1',
    'assert(' + name + ');'
  ];
  fs.mkdir('tests', function(err) {
    if(err) {
      callback(err);
    } else {
      console.log('`tests` directory created...');
      fs.writeFile(
        'tests/' + name + '-tests.js',
        testFileMock.join('\n'),
        function(file_err) {
          if(file_err) {
            callback(file_err);
          } else {
            callback(null, 'Simple test mock created....');
          }
      });
    }
  });
};
