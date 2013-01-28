"use strict";

$module("module1", function (exports) {
  exports.version = "module1";
  $assert(exports);
  $print("Module1 was loaded");
});
