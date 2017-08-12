'use strict';

var fs = require('fs');
var gi = require('git-info');
var path = process.cwd();

var rollupConfigTemplate = `
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  entry: 'src/main.js',
  format: 'umd',
  moduleName: '*MODULENAME*',
  plugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      contentBase: ['dist']
    }),
    livereload({
      watch: ['dist']
    })
  ],
  dest: 'index.js'
}
`;


module.exports = function(callback){
  gi(['name'], function(err, resp) {
    rollupConfigTemplate = rollupConfigTemplate.replace(
      '*MODULENAME*',
      resp.name
    );

    fs.writeFile(
      path + '/rollup.config.js',
      rollupConfigTemplate,
      function(err) {
        if(err) {
          callback(err);
        } else {
          callback(null, 'rollup.config.js file saved...');
        }
      }
    );
  });
};
