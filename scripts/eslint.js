'use strict';

var fs = require('fs');
var path = process.cwd();

var esLintRc = `
{
  "extends": "defaults",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": [1, "only-multiline"],
    "no-console": 0
  },
  "globals": {
    "FB": false
  }
}
`;


module.exports = function(callback) {
  fs.writeFile(
    path + '/.eslintrc',
    esLintRc,
    function(err) {
      if(err) {
        callback(err);
      } else {
        callback(null, '.eslintrc file saved...');
      }
    }
  );
};
