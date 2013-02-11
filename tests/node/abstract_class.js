"use strict";

console.log("=== Abstract class: ===");

require("../../lib/class4js.js");

var Component = $abstract_class({
  __construct__: function () { 
    this.__name = "Component";
  },
  name: { 
    get: function () { 
      return this.__name; 
    },
    set: function (value) { 
      this.__name = value; 
    }
  }
}); 

var Button = $class({
  __construct__: function () {
    this.name = "Button";
  }
}, Component)

try {
  var component = new Component(); 
} catch (ex) {
  console.log(ex.message);
} 

var button = new Button();
console.log(button.name);

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
