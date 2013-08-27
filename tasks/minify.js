'use strict';

module.exports = function (grunt) {

  var compressor = require('yuicompressor');
  var fs = require('fs');

  grunt.registerMultiTask('minify', 'Minify JavaScript files with YUI Compressor', function () {
    var done = this.async();
    if (!fs.existsSync(this.data.src)) {
      grunt.log.writeln("File '" + this.data.src + "' not found.");
      done(false);
    }
    var src = this.data.src;
    var dest = this.data.dest;
    compressor.compress(this.data.src, {
      charset: 'utf8',
      type: 'js',
      nomunge: true,
      'preserve-semi': true,
      'disable-optimizations': true
    }, function(error, data, extra) {
      if (error) {
        grunt.log.writeln(error);
        done(false);
      } else {
        if (extra) {
          grunt.log.writeln(extra);
        }
        data = "\"use strict\";" + data;
        fs.writeFileSync(dest, data);
        done(true);
      }
    });
  });

};