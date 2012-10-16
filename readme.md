# class4js

The __class4js__ library is for class-driven development in JavaScript. It 
allows to emulate classes in JavaScript. Library based on ECMAScript 5 API and 
implements _open/close principle_. When class is created, class is closed for 
modifications.

The library can be used with nodejs and in the web browsers.

__The Open/Close principle__

    A module should be open for extension but closed for modifications.

## Installation

    npm install class4js

## API

Private class members are decorated with __ and protected with _.

### Create class

Creates a class: 

    class4js.Class.create(properties:Object, parent:Object, interfaces:Array): Object

or

    $class(properties:Object, parent:Object, interfaces:Array): Object

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

### Interfaces

Creates an interfaces: 

    class4js.Interface.create(properties:Object, parent:Object): Object

or

    $interface(properties:Object, parent:Object): Object

You can check if object is compatable with given interface

    class4js.Interface.instanceOf(source:Object, target:Object): Boolean

or

    $is(source:Object, target:Object): Boolean 

__Example__

    "use strict";
    
    require("class4js.js");
    
    var IDrawable = $interface({
    
      visible: {
        get: function () {
        }
      },
    
      drawOrder: {
        get: function () {
        }
      },
    
      draw: function (context) {
      } 
    
    });
    
    var Rectangle = $class({
      __construct__: function (visible, drawOrder) {
        this.__visible = visible;
        this.__drawOrder = drawOrder;
      },
    
      visible: {
        get: function () {
          return this.__visible;
        }
      },
    
      drawOrder: {
        get: function () {
          return this.__drawOrder;
        }
      },
    
      draw: function (context) {
        console.log("Rectangle is drawn...");
      } 
    
    }, null, IDrawable);
    
    var rec = new Rectangle(true, 10);
    
    console.log($is(rec, IDrawable));

### Object factory

Creates new object by given type and copies properties values to created object:

    class4js.ObjectFactory.create(type:Function, options:Object): Object

or

    $create(type:Function, options:Object): Object

__Example__

    "use strict";
    
    require("../lib/class4js.js");
    
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

### Extensions

Extensions enables you to add methods to existing types without creating a new 
derived type.

    class4js.Class.addExtension(extension:Function): void

__Example__

    "use strict";
    
    var class4js = require("../../lib/class4js.js");
    
    var ICollection = $interface({
    
      items: function() {
      }
    
    });
    
    var Collection = $class({
      
      __construct__: function (items) {
        this.__items = items;
      },
    
      items: function () {
        return this.__items;
      }
    
    }, null, ICollection);
    
    class4js.Class.addExtension(function () {
      if ($is(this, ICollection)) {
        Object.defineProperty(this, "forEach", {
          value: function (callback) {
            for (var i = 0; i < this.items().length; i++) {
              callback(this.items()[i]);
            }   
          },
          writable: false,
          enumerable: true,
          configurable: false
        });
      }
    }); 
    
    var collection = new Collection([1, 2, 3]);
    
    collection.forEach(function (item) {
      console.log(item);
    });

### Web browsers

If you want to use __class4js__ in the web browser, simply include __class4js.min.js__
file to your page.

__index.html__

    <!DOCTYPE HTML>
    <html>
    <head>
      <title>Samples</title>
    </head>
    <body>
      <div>Sample...</div>
      <script src="class4js.min.js"></script>
      <script src="sample.js"></script>
    </body>
    </html>

__sample.js__

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

## License

This software is distributed under the terms of the GNU General Public License, 
version 3 (GPL-3.0).
