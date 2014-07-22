'use strict';

var pjg = require('./scripts/package-json-generator');

pjg(function(err, msg) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(msg);
})
