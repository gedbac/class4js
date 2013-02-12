'use strict';

require('../../lib/class4js.js');

var flag = false;
var window = {};
var util = $module(function (global, fs, exports) {

  flag = (global == window);

}, [window, 'fs']);

console.assert(flag);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
