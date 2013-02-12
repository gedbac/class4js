'use strict';

require('../../lib/class4js.js');

var Person = $class({
  MAX_AGE: 99,
  __construct__: function () {
  }
});

console.assert(Person.MAX_AGE == 99);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
