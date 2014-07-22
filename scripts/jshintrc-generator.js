'use strict';

var fs = require('fs');
var structure = {
  'camelcase': false,
  'curly': true,
  'forin': false,
  'latedef': false,
  'newcap': false,
  'noarg': true,
  'nonew': true,
  'quotmark': 'single',
  'undef': true,
  'unused': 'vars',
  'strict': true,
  'trailing': true,
  'maxlen': 80,
  'eqnull': true,
  'esnext': true,
  'expr': true,
  'globalstrict': true,
  'maxerr': 1000,
  'regexdash': true,
  'laxcomma': true,
  'proto': true,
  'node': true,
  'devel': true,
  'nonstandard': true,
  'worker': true
};

module.exports = function(callback){
  fs.writeFile('.jshintrc', JSON.stringify(structure, null, 2), function(err) {
    if(err) {
      callback(err);
    } else {
      callback(null, '.jshintrc file saved...');
    }
  });
};
