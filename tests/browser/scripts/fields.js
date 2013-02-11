$run('Fields', function () {

  'use strict';

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
      this.__gender = gender;
    }
  });

  var person = new Person('John Smith');

  $assert(person.getName() == 'John Smith');
  $assert(person.getAge() == 30);

  var errorRaised = false;
  try {
    person.setGender('male');
  } catch (e) {
    errorRaised = true;
  }
  $assert(errorRaised);

  $complete('Fields');

});
