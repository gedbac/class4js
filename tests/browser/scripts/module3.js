"use strict";

$module(function (module1, exports) {
  $assert(exports);
  $assert(module1);
  $assert(module1.version === "module1");
  exports.version = "module3";
}, ["module1"]);
