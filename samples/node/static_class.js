"use strict";

console.log("=== Static class: ===");

var class4js = require("../../lib/class4js.js");

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
console.log(Counter.current);

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
