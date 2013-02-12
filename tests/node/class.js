'use strict';

require('../../lib/class4js.js');

var constructorInvoked = false;

var Person = $class({
  __construct__: function (name) {
    this.__name = name;
    constructorInvoked = true;
  },
  getName: function () {
    return this.__name;
  }
});

var person = new Person("John Smith");

console.assert(constructorInvoked);
console.assert(person.getName() == 'John Smith');

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
