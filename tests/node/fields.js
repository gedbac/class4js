'use strict';

require('../../lib/class4js.js');

var Person = $class({
  __age: 30,
  __comment: null,
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
  },
  getComment: function () {
    return this.__comment;
  },
  setComment: function (comment) {
    this.__comment = comment;
  }
});

var person = new Person('John Smith');

person.setComment("Person's name is John");

console.assert(person.getName() == 'John Smith');
console.assert(person.getAge() == 30);
console.assert(person.getComment() == "Person's name is John");

var errorRaised = false;
try {
  person.setGender('male');
} catch (e) {
  errorRaised = true;
}
console.assert(errorRaised);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
