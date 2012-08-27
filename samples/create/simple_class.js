"use strict";

var class4js = require("class4js");

var Person = $class({
  __construct__: function (name) {
    this.__name = name;
  },
  getName: function () {
    return this.__name;
  }
});

var person = new Person("John Smith");

console.log(person.getName());
