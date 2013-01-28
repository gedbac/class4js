"use strict";

$module("module2", function (module1, exports) {
  $assert(exports);
  $assert(module1);
  $assert(module1.version === "module1");
  exports.version = "module2";
  $print("Module2 was loaded");
}, ["module1"]);
