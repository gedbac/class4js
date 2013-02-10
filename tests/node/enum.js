"use strict";

var class4js = require("../../lib/class4js.js");

var Priority = $enum({
  low: 0,
  normal: 1,
  high: 2
});

for (var field in Priority) {
  console.log(field);
}

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
