'use strict';

var async = require('async');
var tasks = [
  require('./scripts/precommit-hook'),
  require('./scripts/jshintrc'),
  require('./scripts/fancom'),
  require('./scripts/tests'),
  require('./scripts/assert')
];

require('./scripts/package-json')(function(err, msg) {
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
    function() {
      require('./scripts/scripts')(function(err, msg){
        if (err) {
          console.log(err);
          return;
        }
        console.log(msg);
        console.log('DONE...');
      });
    }
  );
});
