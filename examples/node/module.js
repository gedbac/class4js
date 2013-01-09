"use strict";

console.log("=== Module example: ===");

var class4js = require("../../lib/class4js.js");

var util = $module(function (exports) {

  var Reader = $class({
   
    __construct__: function () {
    },

    read: function () {
      console.log("Reading...");  
    } 
  
  }); 

  exports.Reader = Reader;

});

var reader = new util.Reader();
reader.read();

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
