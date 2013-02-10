"use strict";

require("../../lib/class4js.js");

$namespace("org.myapp.util");

org.myapp.util = (function () {

  var util = {};

  return util;

}());

console.log(org);

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
