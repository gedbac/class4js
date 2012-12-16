"use strict";

var class4js = require("../../lib/class4js.js");

var Person = $class({
  MAX_AGE: 99,
  __construct__: function () {
  }
});

console.log(Person.MAX_AGE);

// It's required for PhantomJS
if (phantom) {
  phantom.exit();
}
