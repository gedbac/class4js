"use strict";

$module("module3", function (module1, exports) {
  $assert(exports);
  $assert(module1);
  $assert(module1.version === "module1");
  exports.version = "module3";
  $print("Module3 was loaded");
}, ["module1"]);
