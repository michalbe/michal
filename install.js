'use strict';

var pjg = require('./scripts/package-json-generator');
var phg = require('./scripts/precommit-hook-generator');

pjg(function(err, msg) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(msg);
  phg(function(err, msg) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(msg);
  });
})
