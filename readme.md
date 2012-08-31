# class4js

The __class4js__ library is for class-driven development in JavaScript. It 
allows to emulate classes in JavaScript. Library based on ECMAScript 5 API and 
implements _open/close principle_. When class is created, class is closed for 
modifications.

__The Open/Close principle__

    A module should be open for extension but closed for modifications.

## Installation

    npm install class4js

## API

Private class members are decorated with __ and protected with _.

### Create class

Creates a class: 

    class4js.Class.create(properties:Object, parent:Object): Object

or

    $class(properties:Object, parent:Object): Object

__Example__

    "use strict";

    require("class4js");

    var Person = $class({
      __construct__: function (name) {
        this.__name = name;
      },
      getName: function () {
        return this.__name;
      }
    });

    var person = new Person("John Smith");

    console.log(person.getName());    

### Fields

All class fields should be defined as class members or initialized in constructor, 
because when class is created, class is closed for modifications.

__Example__

    "use strict";
    
    require("class4js");
    
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

### Constants

Use NAMES_LIKE_THIS for constants.

__Example__

    "use strict";
    
    require("class4js");
    
    var Person = $class({
      MAX_AGE: 99,
      __construct__: function () {
      }
    });
    
    console.log(Person.MAX_AGE);

### Properties

A property is a member that provides a flexible mechanism to read, write, or 
compute the value of a private field:

__Example__

    "use strict";
    
    require("class4js");
    
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
    person.name = "John Smith";
    
    console.log(person.name);
    console.log(person.created); 

### Static members

class4js library allows to define static class members:

__Example__

    "use strict";
    
    require("class4js");
    
    var Calculator = $class({
      __static__: {
        sum: function (a, b) {
          return a + b;
        },
        subtract: function (a, b) {
          return a - b;
        }
      }
    }); 
    
    console.log(Calculator.sum(2, 2));
    console.log(Calculator.subtract(8, 4));

### Inheritance

Creates a class with the specified parent:

__Example__

    "use strict";
    
    require("class4js");
    
    var Shape = $class({
      __construct__: function () {
      },
      draw: function () {
        console.log("Shape is drawn...");
      }
    });
    
    var Rectangle = $class({
      __construct__: function () {
      },
      draw: function () {
        this._super.draw();
        console.log("Rectangle is drawn...");
      }
    }, Shape); 
    
    var rec = new Rectangle();
    rec.draw();

## License

This software is distributed under the terms of the GNU General Public License, 
version 3 (GPL-3.0).
