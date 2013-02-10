'use strict';

$module(function (c, d, exports) { 
  console.log('b starting');
  exports.done = true;
  console.log('b done');
}, ['c', 'd']);
