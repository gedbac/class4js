# class4js

The __class4js__ module is for class-driven development in JavaScript. It 
allows to emulate classes in JavaScript. Module based on ECMAScript 5 standart and 
implements open/close principle:  _"When class is created, class is closed for 
modifications"_. __class4js__  is free software distributed under the terms of 
the _GNU General Public License version 3_ and can be used with __node.js__, 
__modern web browsers__ and even with __PhantomJS__.

    // Simple class example:
    
    var Shape = $class({
      __construct__: function () {
        this.__x = 0;
        this.__y = 0;
      },
      x: {
        get: function () {
          return this.__x;
        },
        set: function (value) {
          this.__x = value;
        }
      },
      y: {
        get: function () {
          return this.__y;
        },
        set: function (value) {
          this.__y = value;
        }
      },
      draw: function () {
        console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
      }, 
      moveTo: function (x, y) {
        this.x = x;
        this.y = y;
      }
    });
    
    var shape = new Shape({ x: 100, y: 100 });
    shape.moveTo(120, 85);
    
    // Output:
    // Drawing shape at: (120, 85)

## Overview

* Installation
  * Node.js
  * Web Browser
  * PhantomJS
* API
  * Class
      * Constructor
      * Static Constructor
      * Object initializer
      * Constant
      * Fields
      * Properties
      * Static Members
      * Inheritance
  * Abstract Class
  * Static Class
  * Enum
  * Interface 
  * Object Factory
  * Modules
  * Namespace
  * Extensions
* License

## Installation

### Node.js

To install __class4js__ module for node.js, this command should be used:

    npm install class4js

Also __class4js__ module's loading statement should be added to main module:

    'use strict';
    
    require('class4js');
    
    // Your code goes here...

### Web Browser

To use __class4js__ module in web browser, simply donwload newest minified 
__class4js__ module file and include it to your browsers. You can also define 
main module of application:

    <!DOCTYPE HTML>
    <html>
    <head>
      <script src="./scripts/class4js.min.js" data-main="./scripts/main.js"></script>
    </head>
    <body>
      <!-- Your code goes here... -->
    </body>
    </html>

### PhantomJS

To use __class4js__ in with PhantomJS, simply copy __class4js__ module near 
PhantomJS executor and include __class4js__ module's loading statement to main 
module:

    'use strict';
    
    require('./class4js.js');
    
    // Your code goes here...

## API

### Class

A class is a construct that is used to create instances of itself. A class defines 
constituent members which enable its instances to have state and behavior. 
Private class members are decorated with \_\_ and protected with \_. Classes are 
declared using the keyword __$class__:

    $class(properties:Object, parent:Object, interfaces:Array): Function

__Example:__

    var Shape = $class({
      __construct__: function () {
        this.__x = 0;
        this.__y = 0;
      },
      x: {
        get: function () {
          return this.__x;
        },
        set: function (value) {
          this.__x = value;
        }
      },
      y: {
        get: function () {
          return this.__y;
        },
        set: function (value) {
          this.__y = value;
        }
      },
      draw: function () {
        console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
      }, 
      moveTo: function (x, y) {
        this.x = x;
        this.y = y;
      }
    });
    
    var shape = new Shape({ x: 100, y: 100 });
    shape.moveTo(120, 85);   

#### Constructor

Whenever a class is created, its constructor is called. Name for a constructor 
is *\_\_construct\_\_*.

__Example:__

    var Shape = $class({
      __construct__: function () {
        // Your code goes here...
      }
    });

#### Static Constructor

Static constructor is a static data initializer. Static constructors are called 
when the class is defined. Name for a static constructor is the same as ordinal 
constructor name, but must be surrounded with *\_\_static\_\_* statement.

__Example__:

    var Shape = $class({
      __static__: {
        __construct__: function () {
          // Your code goes here...
        }
      }
    });

#### Object Initializer

Object can be initialized with anonymous object.

__Example:__

    var Shape = $class({
      __construct__: function () {
        this.__x = 0;
        this.__y = 0;
      },
      x: {
        get: function () {
          return this.__x;
        },
        set: function (value) {
          this.__x = value;
        }
      },
      y: {
        get: function () {
          return this.__y;
        },
        set: function (value) {
          this.__y = value;
        }
      }
    });
    
    var shape = new Shape({ x: 100, y: 100 });

#### Constant

A constant is a class member which value can't be changed. Constant names should 
be in uppercasing.

__Example:__

    var Calendar = $class({
      MONTHS: 12,
      WEEKS: 52,
      DAYS: 365,
    });

#### Fields

All class fields should be defined as class members or initialized in constructor, 
because when class is created, class is closed for modifications.

__Example:__

    var Shape = $class({
      __x: 0,
      __y: 0
    });

#### Properties

A property is a member that provides a flexible mechanism to read, write, or 
compute the value of a private field.

__Example__:

    var Shape = $class({
      __construct__: function () {
        this.__x = 0;
        this.__y = 0;
      },
      x: {
        get: function () {
          return this.__x;
        },
        set: function (value) {
          this.__x = value;
        }
      },
      y: {
        get: function () {
          return this.__y;
        },
        set: function (value) {
          this.__y = value;
        }
      }
    });

#### Static members

Static class members are used to create data and functions that can be accessed 
without creating an instance of the class. All static class members should be 
must be surrounded with *\_\_static\_\_* statement.

__Example:__

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

#### Inheritance

Inheritance is a way to reuse code and to establish a subtype from an existing 
object. Constructor inheritance is also supported. To access parent's methods 
property *\_super* should be used.

__Example:__

    var Shape = $class({
      __construct__: function () {
        this.__x = 0;
        this.__y = 0;
      },
      x: {
        get: function () {
          return this.__x;
        },
        set: function (value) {
          this.__x = value;
        }
      },
      y: {
        get: function () {
          return this.__y;
        },
        set: function (value) {
          this.__y = value;
        }
      },
      draw: function () {
        console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
      }
    });
    
    var Rectangle = $class({
      __construct__: function () {
        this.__width = 0;
        this.__height = 0;
      },
      width: {
        get: function () {
          return this.__width;
        },
        set: function (value) {
          this.__width = value;
        }
      },
      height: {
        get: function () {
          return this.__height;
        },
        set: function (value) {
          this.__height = value;
        }
      },
      draw: function () {
        this.__super.draw();
        console.log("Drawing rectangle (" + this.width + ", " + this.height 
          + ") at: (" + this.x + ", " + this.y + ")");
      }
    }, Shape);
    
    var shape = new Shape({ x: 100, y: 100, with: 50, height: 50 });
    shape.draw();

### Abstract Class

Abstract class is intended only to be a base class of other classes. Abstract 
class can't be  instantiated. Abstract classes are declared using the keyword 
__$abstract_class__:

    $abstract_class(properties:Object, parent:Object, interfaces:Array): Function

__Example:__

    var Component = $abstract_class({
      __construct__: function () { 
        this.__name = 'Component';
      },
      name: { 
        get: function () { 
          return this.__name; 
        },
        set: function (value) { 
          this.__name = value; 
        }
      }
    }); 
    
    var Button = $class({
      __construct__: function () {
        this.name = 'Button1';
      }
    }, Component)
    
    try {
      var component = new Component(); 
    } catch (ex) {
      console.log(ex.message);
    } 
    
    var button = new Button();

### Static Class

Static class can't be initialized or inherited and contains only static members. 
Abstract classes are declared using the keyword __$static_class__:

    $static_class(properties:Object): Object

__Example:__

    var Counter = $static_class({
      __construct__: function () {
        this.__value = 0;
      },
      increment: function () {
        this.__value++;
      },
      current: {
        get: function () {
          return this.__value;
        }
      }
    });
    
    Counter.increment();

### Enum

__enum__ keyword can be used to set up collections of named integer constants.

    $enum(fields:Object): Object

__Example:__

    var Priority = $enum({
      low: 0,
      normal: 1,
      high: 2
    });

### Namespaces

Creates a namespace:

    class4js.Namespace.create(name:String): void

or

    $namespace(name:String): void

__Example__

    "use strict";
    
    require("../../lib/class4js.js");
    
    $namespace("org.myapp.util");
    
    org.myapp.util = (function () {
    
      var util = {};
    
      return util;
    
    }());
    
    console.log(org);

### Interfaces

Creates an interfaces: 

    class4js.Interface.create(properties:Object, parents:Array): Object

or

    $interface(properties:Object, parent:Object): Object

You can check if object is compatable with given interface

    class4js.Interface.instanceOf(source:Object, target:Object): Boolean

or

    $is(source:Object, target:Object): Boolean 

An interface can inherit or more other interfaces.

__Example__

    "use strict";
    
    require("class4js.js");
    
    var IComponent = $interface({ 
      id: {
        get: function () {}
      }
    });
    
    var IDrawable = $interface({
      visible: {
        get: function () {}
      },
      drawOrder: {
        get: function () {}
      },
      draw: function (context) {} 
    }, IComponent);
    
    var Rectangle = $class({
    
      __construct__: function (visible, drawOrder) {
        this.__visible = visible;
        this.__drawOrder = drawOrder;
      },
    
      id: {
        get: function () {
          return this.__id;
        }
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
    
    require("class4js.js");
    
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
      id: 24,
      name: "Peter Joe",
      age: 42
    });
    
    console.log(organisation);

### Modules

Modules were included to __class4js__ for better compatability with browsers, because
in browsers were no build in module system like in nodejs. In nodejs module wrapps 
nodejs module systems loading.

Creates an module:

    class4js.Module.create(scope:Function): Object

or

    $module(scope:Function): Object

__Example__

    "use strict";
    
    require("class4js.js");
    
    var util = $module(function (exports) {
    
      var Reader = $class({
       
        __construct__: function () {
        },
    
        read: function () {
          console.log("Reading...");  
        } 
      
      }); 
    
      exports.Reader = Reader;
    
    });
    
    var reader = new util.Reader();
    reader.read();

### Extensions

Extensions enables you to add methods to existing types without creating a new 
derived type.

    class4js.Class.addExtension(target:Object, name:String, value:Function): void

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
    
    $extend(ICollection, "forEach", function (callback) {
      if (callback) {
        for (var i = 0; i < this.items().length; i++) {
          callback(this.items()[i]);
        } 
      } 
    });
    
    var collection = new Collection([1, 2, 3]);
    
    collection.forEach(function (item) {
      console.log(item);
    });

## License

This software is distributed under the terms of the GNU General Public License, 
version 3 (GPL-3.0).
