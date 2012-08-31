"use strict";

require("class4js");

var Calculator = $class({
  __static__: {
    sum: function (a, b) {
      return a + b;
    },
    subtract: function (a, b) {
      return a - b;
    }
  }
}); 

console.log(Calculator.sum(2, 2));
console.log(Calculator.subtract(8, 4));
