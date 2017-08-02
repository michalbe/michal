#!/usr/bin/env node
'use strict';

var cliArgs = require('command-line-args');
var async = require('async');
var ai = require('ascii-images');
var packageJsonTask = require('../scripts/package-json');
var includePackageJson = false;

var tasksDesc = {
  f: ['../scripts/fancom'],
  t: ['../scripts/tests', '../scripts/assert'],
  others: ['../scripts/rollup-config']
};

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
    alias:'n',
    description: 'Install everything but tests'
  },
  {
    name: 'fancom',
    type: Boolean,
    alias: 'f',
    description: 'Install .fancom file'
  },
  {
    name: 'tests',
    type: Boolean,
    alias: 't',
    description: 'Install tests'
  }
]);

var usage = cli.getUsage({
    header: 'My Initialization Config Handling Automator. LOL.',
    footer: '\nFor more information, visit https://github.com/michalbe'
});

var options = cli.parse();

var tasks = [];
var addtaskPath = function(taskPath) {
  tasks.push(require(taskPath));
};

// I know this carbonara code is awful, but it's 05:27AM
// and my last cigarette break was around 18:30
ai(__dirname + '/../michal.png', function(logo) {
  console.log('\u001b[2J\u001b[0;0H');
  console.log(logo);

  if (Object.keys(options).length === 0) {
    console.log(usage);
    return;
  } else if (options['no-test'] === true) {

    includePackageJson = true;
    tasksDesc.f.forEach(addtaskPath);
    tasksDesc.others.forEach(addtaskPath);

  } else if (options.all === true) {

    includePackageJson = true;
    for (var i in tasksDesc) {
      tasksDesc[i].forEach(addtaskPath);
    }

  } else {
    if (options.fancom) {
      tasksDesc.f.forEach(addtaskPath);
    }
    if (options.tests) {
      tasksDesc.t.forEach(addtaskPath);
    }
  }

  var performTasks = function(err, msg) {
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
        require('../scripts/scripts')(options, function(err, msg) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(msg);
          console.log('DONE...');
        });
      }
    );
  };

  if (includePackageJson) {
    packageJsonTask(performTasks);
  } else {
    performTasks(null,
      'Skipping installation of package.json for selected tasks.'
    );
  }
});
