$run('Fields', function () {

  'use strict';

  var Factory = $static_class({
    value: 10
  });

  $assert(Factory.value == 10);

  Factory.value = 12;

  $assert(Factory.value == 12);

  var Entity = $class({
    __id: 0,
    getId: function () {
      return this.__id;
    },
    setId: function (id) {
      this.__id = id;
    }
  });

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
    setAge: function (newAge) {
      this.__age = newAge;
    },
    setGender: function (gender) {
      this.__gender = gender;
    },
    getComment: function () {
      return this.__comment;
    },
    setComment: function (comment) {
      this.__comment = comment;
    }
  }, Entity);

  var person = new Person('John Smith');
  
  person.setComment("Person's name is John");

  $assert(person.getId() == 0);
  $assert(person.getName() == 'John Smith');
  $assert(person.getAge() == 30);
  $assert(person.getComment() == "Person's name is John");

  person.setId(12);
  person.setAge(32);

  $assert(person.getId() == 12);
  $assert(person.getAge() == 32);

  var errorRaised = false;
  try {
    person.setGender('male');
  } catch (e) {
    errorRaised = true;
  }
  $assert(errorRaised);

  $complete('Fields');

});
