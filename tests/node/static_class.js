'use strict';

require('../../lib/class4js.js');

var Counter = $static_class({
  __construct__: function () {
    this.__value = 0;
  },
  increment: function () {
    this.__value++;
  },
  current: {
    get: function () {
      return this.__value;
    }
  }
});

Counter.increment();
console.assert(Counter.current == 1);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
