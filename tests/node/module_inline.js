"use strict";

console.log("=== Module Inline ===");

var class4js = require("../../lib/class4js.js");

var util = $module(function (/*exports*/) {

  var Reader = $class({
   
    __construct__: function () {
    },

    read: function () {
      return "#TEXT";  
    } 
  
  }); 

  exports.Reader = Reader;

});

var reader = new util.Reader();
var result = reader.read();

console.assert(result === "#TEXT");

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
