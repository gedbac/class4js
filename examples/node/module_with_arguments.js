"use strict";

console.log("=== Module with arguments examples: ===");

var class4js = require("../../lib/class4js.js");

var util = $module(function (exports, global) {

  global.myVariable = 42; 

}, [global]);

console.log(myVariable);

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
