"use strict";

console.log("=== Module with Arguments ===");

var class4js = require("../../lib/class4js.js");

console.log(this === module);

var d = false;
var window = {};
var util = $module(function (global, fs/*, exports*/) {

  console.log(fs);

  d = true;

  //console.assert(global == window);

}, [window, "fs"]);

console.log(d);
//console.assert(d === true);

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
