$run("Object Factory", function () { 

  "use strict";

  var Entity = $class({
  
    __construct__: function () {
      this.__id = 0;
    },

    id: {
      get: function () {
        return this.__id;
      },
      set: function (value) {
        this.__id = value;
      }
    }

  });

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

  }, Entity);

  var person = new Person({
    id: 10,
    name: "John Smith",
    age: 30
  });
  $assert(person.id === 10);
  $assert(person.name === "John Smith");
  $assert(person.age === 30);

  var Organisation = $class({

    __construct__: function () {
      this.__persons = [];
    },

    add: function (person) {
      this.__persons.push($create(Person, person));
    },

    count: function () {
      return this.__persons.length;
    }

  });

  var organisation = new Organisation();

  organisation.add(person);
  organisation.add({
    id: 24,
    name: "Peter Joe",
    age: 42
  });

  $assert(organisation.count() === 2);

  $complete("Object Factory");

});
