'use strict';

$module(function (c, exports) { 
  console.log('a starting');
  exports.done = true;
  console.log('a done');
}, ['c']);
