(function () { 

  "use strict";

  var Person = $class({
    
    __construct__: function (props) {
      this.__name = null;
      this.__age = 0;
      if (props) {
        $init(this, props);
      }
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

  var person1 = new Person({
    name: "John Smith",
    age: 30
  });
  console.log(person1);

  var person2 = $create(Person, {
    name: "John Smith",
    age: 30
  });
  console.log(person2);

  var Organisation = $class({

    __construct__: function () {
      this.__persons = [];
    },

    add: function (person) {
      this.__persons.push($create(Person, person));
    }

  });

  var organisation = new Organisation();

  organisation.add(person1);
  organisation.add(person2);
  organisation.add({
    name: "Peter Joe",
    age: 42
  });

  console.log(organisation);

}());
