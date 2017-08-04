'use strict';

var exec = require('child_process').exec;
var path = process.cwd();

var packages = [
  'babel-eslint',
  'babel-plugin-external-helpers',
  'babel-preset-latest',
  'eslint',
  'eslint-config-defaults',
  'rollup-plugin-babel',
  'rollup-plugin-commonjs',
  'rollup-plugin-livereload',
  'rollup-plugin-node-resolve',
  'rollup-plugin-serve',
  'rollup-watch'
];

module.exports = function(callback) {
  exec(
    'cd ' + path + '; npm install ' + packages.join(' ') + ' --save-dev',
    function(error, stdout, stderr) {
      if (error) {
        throw new Error('Cannot run `npm` commands.');
      }
      callback(error, packages.length + ' packages installed');
    }
  );
};
