"use strict";

var class4js = require("../../lib/class4js.js");

var Person = $class({
  __construct__: function (name) {
    this.__name = name;
    console.log("ctor");
  },
  getName: function () {
    return this.__name;
  }
});

var person = new Person("John Smith");

console.log(person.getName());

// It's required for PhantomJS
if (phantom) {
  phantom.exit();
}
