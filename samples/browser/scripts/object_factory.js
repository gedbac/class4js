(function () { 

  "use strict";

  var Person = $class({
    
    __construct__: function () {
      this.__name = null;
      this.__age = 0;
    },

    name: {
      get: function () {
        return this.__name;
      },
      set: function (value) {
        this.__name = value;
      }
    },

    age: {
      get: function () {
        return this.__age;
      },
      set: function (value) {
        this.__age = value;
      }
    }

  });

  var person = new Person({
    name: "John Smith",
    age: 30
  });
  console.log(person);

  var Organisation = $class({

    __construct__: function () {
      this.__persons = [];
    },

    add: function (person) {
      this.__persons.push($create(Person, person));
    }

  });

  var organisation = new Organisation();

  organisation.add(person);
  organisation.add({
    name: "Peter Joe",
    age: 42
  });

  console.log(organisation);

}());
