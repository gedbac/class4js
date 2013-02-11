$run('Properties', function () {

  'use strict';

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
  person.name = 'John Smith';

  $assert(person.name == 'John Smith');
  $assert(person.created);

  $complete('Properties');

});
