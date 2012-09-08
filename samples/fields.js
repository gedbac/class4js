"use strict";

var class4js = require("../lib/class4js.js");

var Person = $class({
  __age: 30,
  __construct__: function (name) {
    this.__name = name;
  },
  getName: function () {
    return this.__name;
  },
  getAge: function () {
    return this.__age;
  },
  setGender: function (gender) {
    // It's to late to initialize a class field:
    this.__gender = gender;
  }
});

var person = new Person("John Smith");

console.log(person.getName());
console.log(person.getAge());

// Error will be raised here:
person.setGender("male");
