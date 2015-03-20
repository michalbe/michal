#!/usr/bin/env node
'use strict';

var cliArgs = require('command-line-args');
var async = require('async');
var ai = require('ascii-images');
var packageJsonTask = require('../scripts/package-json');

var cli = cliArgs([
  {
    name: 'all',
    type: Boolean,
    alias: 'a',
    description: 'Install everything'
  },
  {
    name: 'no-test',
    type: Boolean,
    alias:'t',
    description: 'Install everything but tests'
  },
  {
    name: 'basic',
    type: Boolean,
    alias: 'b',
    description: 'Install only package.json, fancom & jshintrc (no jshint lib)'
  }
]);

var usage = cli.getUsage({
    header: 'My Initialization Config Handling Automator. LOL.',
    footer: '\nFor more information, visit https://github.com/michalbe'
});

var options = cli.parse();

var tasks;

// I know this carbonara code is awful, but it's 05:27AM
// and my last cigarette break was around 18:30
ai(__dirname+'/../michal.png', function(logo){
  console.log('\u001b[2J\u001b[0;0H');
  console.log(logo);

  if (Object.keys(options).length === 0) {
    console.log(usage);
    return;
  } else if (options['no-test'] === true) {
    tasks = [
      require('../scripts/precommit-hook'),
      require('../scripts/jshintrc'),
      require('../scripts/fancom')
    ];
  } else if (options.basic === true) {
    tasks = [
       require('../scripts/jshintrc'),
       require('../scripts/fancom')
     ];
  } else {
    tasks = [
     require('../scripts/precommit-hook'),
     require('../scripts/jshintrc'),
     require('../scripts/fancom'),
     require('../scripts/tests'),
     require('../scripts/assert')
   ];
  }

  packageJsonTask(function(err, msg) {
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
        require('../scripts/scripts')(options, function(err, msg){
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
});
