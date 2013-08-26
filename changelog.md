# Changelog

## 2012.08.26, Version 1.0.0

* class4js was implemented
* Samples were added

## 2012.09.08, Version 1.1.0

* Type creating was refactored
* Interfaces were introduced

## 2012.09.09, Version 1.1.1

* Samples were updated
* Interface checking was improved

## 2012.09.15, Version 1.2.0

* ObjectFactory was implemented

## 2012.09.15, Version 1.2.1

* Bug fix: Constructors calling order was changed

## 2012.10.06, Version 1.3.0

* Makefile was added
* Now class4js can be used in browsers
* Samples for browser was added
* Minified version was added for browsers
* All modules are compiled to single class4js module

## 2012.10.09, Version 1.4.0

* Implemented extensions which enables you to add methods to existing types without creating a new derived type

## 2012.10.10, Version 1.4.1

* Bug fix: 'user strict' statement was added to minified file

## 2012.10.11, Version 1.4.2

* Javascript compiler was replaced to yuicompressor
* Method ObjectFactory.initialize was added

## 2012.10.12, Version 1.4.3

* Bug fix: Field was made writable

## 2012.10.15, Version 1.4.4

* Object initializer was build-in to the object constructor

## 2012.12.08, Version 1.5.0

* Now an interface can extend more than one interface
* Re-factored type checking
* Re-factored object factory

## 2012.12.09, Version 1.6.0

* Namespace was introduced

## 2012.12.14, Version 1.6.1

* Minor changes

## 2012.12.16, Version 1.6.2

* Class4js module structure was re-factored
* Class4js was made compatible with PhantomJS

## 2012.12.17, Version 1.6.3

* Modules were introduced

## 2012.12.21, Version 1.6.4

* Bugs related to formatting were fixed

## 2012.12.22, Version 1.7.0

* Method 'toString' was added to TypeException class
* Module can be created with arguments
* Breaking change: extensions were re-designed

## 2012.12.23, Version 1.7.1

* Extension's method can not override existing method
* Enums were introduced

## 2013.01.02, Version 1.8.0

* Abstract class was introduced
* Static class was introduced
* Static constructor was added to ordinal class

## 2013.02.13, Version 1.9.0

* Dynamic module loading was implemented
* Class creating was improved

## 2013.02.17, Version 1.9.1

* Attribute 'data-main' was added to script tag wich allows to load main module

## 2013.03.20, Version 1.9.2

* Abstract class creation was fixed
* Parent's class method invocation was refactored. $super keyword was introduced
* Constructor invocation was improved
* Enum's name checking was updated

## 2013.06.03, Version 1.10.0

* Proxies were introduced
* Events were introduced
* Method toString, which returns object's type, was added
* Object intialization with anonymous object was optimized
* Parameter '$super' invoking was optimized
* Fields initialization was fixed

## 2013.06.03, Version 1.10.1

* Bug fix: "Method 'toString' can't be overridden"

## 2013.06.10, Version 1.10.2

* Bug fix: "Event listener for non existing event can be added"
* Improvement: Namespaces can be used within modules
* Bug fix: "Method removeAllEventListener was renamed to removeAllEventListeners"

## 2013.07.28, Version 1.10.3

* Bug fix: "Namespace usage within module was fixed"
* Bug fix: "Class proxy's initialization was fixed"
* Bug fix: "Now field with 'null' value can be defined"
* Bug fix: Method 'removeAllEventListeners' can be invoked without parameters.
* Class can be defined within namespace

## 2013.08.03, Version 1.10.4

* "Grunt has been integrated"
* Bug fix: Statement 'use strict' has been fixed.
* jshint task has been included