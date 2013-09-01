# class4js

[http://www.class4js.com](http://www.class4js.com)

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
    shape.draw();

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

To use __class4js__ module in web browser, simply download newest minified
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

### NuGet

In Visual Studio __class4js__ module can be installed using NuGet extension. To
install class4js, run the following command in the package manager console.

    Install-Package class4js

## API

### Class

A class is a construct that is used to create instances of itself. A class defines
constituent members which enable its instances to have state and behavior.
Private class members are decorated with \_\_ and protected with \_. Classes are
declared by using the keyword __$class__:

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
    shape.draw();

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
constructor name, but must be surrounded by *\_\_static\_\_* statement.

__Example__:

    var Shape = $class({
      __static__: {
        __construct__: function () {
          // Your code goes here...
        }
      }
    });

#### Object Initializer

Object can be initialized with anonymous object. All properties from anonymous
object are copied to the target object.

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
must be surrounded by *\_\_static\_\_* statement.

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

    var result = Calculator.sum(2, 2);

#### Inheritance

Inheritance is a way to reuse code and to establish a subtype from an existing
object. Constructor inheritance is also supported. To access parent's method,
argument *$super* should be used. It must be the first argument in method definition.
*$super* argument is optional.

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
      draw: function ($super) {
        $super.draw();
        console.log("Drawing rectangle (" + this.width + ", " + this.height
          + ") at: (" + this.x + ", " + this.y + ")");
      }
    }, Shape);

    var shape = new Shape({ x: 100, y: 100, with: 50, height: 50 });
    shape.draw();

### Abstract Class

Abstract class is intended only to be a base class of other classes. Abstract
class can't be  instantiated. Abstract classes are declared by using the keyword
__$abstract_class__.

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
Abstract classes are declared by using the keyword __$static_class__.

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

__$enum__ keyword can be used to set up collections of named integer constants.

    $enum(fields:Object): Object

__Example:__

    var Priority = $enum({
      LOW: 0,
      NORMAL: 1,
      HIGH: 2
    });

### Interface

Interfaces form a contract between the class and the outside world. If your class
claims to implement an interface, all methods defined by that interface must
appear in its source code. Interfaces are declared by using the keyword __$interface__.

    $interface(properties:Object, parent:Object): Object

__$is__ keyword can be used to check object's compatible with a given type.

    $is(obj:Object, type:Object): Boolean

A class can inherit one or more interfaces.

__Example:__

    var IDrawable = $interface({
      draw: function (context) {}
    });

    var Shape = $class({
      __construct__: function () {
        this.__name = 'Shape';
      },
      name: {
        get: function () {
          return this.__name;
        }
      },
      draw: function () {
        console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
      }
    }, IDrawable);

    var shape = new Shape();

    console.log($is(shape, IDrawable));

### Object factory

Object can be created by given type and initialized from anonymous object. To
accomplish such task keyword __$create__ is used.

    $create(type:Function, options:Object): Object

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

    var Layer = $class({
      __construct__: function () {
        this.__shapes = [];
      },
      add: function (options) {
        this.__shapes.push($create(Shape, options));
      }
    });

    var layer = new Layer();
    layer.add({ x: 10, y: 10 });

All properties from anonymous object can be copied to existing object. To
accomplish such task keyword __$init__ is used.

    $init(target:Object, options:Object): void

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

    var shape = new Shape();
    $init(shape, { x: 10, y: 10 });

### Module

Modules were included to __class4js__ for better compatability with browsers.
Browsers don't have a built in module system. In Node.js modules are based
on internal module loading. Modules are declared by using the keyword __$module__.

    $module(scope:Function, dependencies:Array): Object

__Example:__

    $config({
      debug: true,
      modules: [{
        name: 'a',
        path: './a.js'
      }]
    });

    var external_module = {};

    var util = $module(function (fs, a, em, exports, global) {
      var Reader = $class({
        __construct__: function () {
        },
        read: function () {
          console.log("Reading...");
        }
      });
      exports.Reader = Reader;
    }, ['fs', 'a', external_module]);

    var reader = new util.Reader();
    reader.read();

### Namespace

Namespaces are declared using the keyword __$namespace__. Namespaces help avoid
naming collisions or excessive name prefixing.

    $namespace(name:String, items:Object): void

__Example:__

    $namespace('org.myapp.util');

    org.myapp.util = (function () {
      var util = {};
      return util;
    }());

Namespaces can be used within modules.

__Example:__

    var myapp = $module(function (myapp) {

      $namespace('myapp.visual.common');

      myapp.visual.common.Button = $class({
        // Code goes here....
      });

    });

Also class can be used within namespace.

__Example:__

    $namespace('myapp.visual', {
      Shape: $class({
        __construct__: function () {

        },
        draw: function () {

        }
      })
    });

### Extension

Extensions enables you to add methods to existing types without creating a new
derived type.

    $extend(target:Object, name:String, value:Function): void

__Example:__

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
    }, ICollection);

    $extend(ICollection, 'forEach', function (callback) {
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
