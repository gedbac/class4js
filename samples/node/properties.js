"use strict";

var class4js = require("../../lib/class4js.js");

var Person = $class({
  __construct__: function (name) {
    this.__name = name;
    this.__created = new Date();
  },
  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    }
  },
  created: {
    get: function () {
      return this.__created;
    }
  }
});

var person = new Person();
person.name = "John Smith";

console.log(person.name);
console.log(person.created);

// It's required for PhantomJS
if (phantom) {
  phantom.exit();
}
