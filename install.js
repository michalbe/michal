'use strict';

var async = require('async');
var tasks = [
  require('./scripts/precommit-hook-generator'),
  require('./scripts/jshintrc-generator')
];

require('./scripts/package-json-generator')(function(err, msg) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(msg);

  async.each(
    tasks,
    function(task, cb) {
      task(function(err, msg) {
        if (err) {
          throw new Error(err);
        }
        console.log(msg);
        cb();
      });
    },
    function(){
      console.log('DONE...');
    }
  );
});
