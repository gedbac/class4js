'use strict';

require('../../lib/class4js.js');

var Calculator = $class({
  __static__: {
    sum: function (a, b) {
      return a + b;
    },
    subtract: function (a, b) {
      return a - b;
    }
  }
}); 

console.assert(Calculator.sum(2, 2) == 4);
console.assert(Calculator.subtract(8, 4) == 4);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
