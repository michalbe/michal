'use strict';

var https = require('https');
var fs = require('fs');
var config = 'https://raw.githubusercontent.com/michalbe/fancom/master/.fancom';

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(function(){
        cb(null, 'fancom config downloaded...');
      });
    });
  });
};

module.exports = function(callback){
  download(config, '.fancom', callback);
};
