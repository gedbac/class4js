$run('Class', function () {

  'use strict';

  var constructorInvoked = false;

  var Person = $class({
    __construct__: function (name) {
      this.__name = name;
      constructorInvoked = true;
    },
    getName: function () {
      return this.__name;
    },
    toString: function () {
      return '[object Person]';
    }
  });

  var person = new Person('John Smith');

  $assert(constructorInvoked);
  $assert(person.getName() == 'John Smith');

  $complete('Class');

});

