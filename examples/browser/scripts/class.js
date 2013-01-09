(function () {

  "use strict";

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

}());
