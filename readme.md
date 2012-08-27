# class4js

The __class4js__ library is for class-driven development in JavaScript. It 
allows to emulate classes in JavaScript. Library based on ECMAScript 5 API and 
implements on _open/close principle_. When class is created, class is closed 
for modifications.

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

    var class4js = require("class4js");

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

## Licenses

This software is distributed under the terms of the GNU General Public License, 
version 3 (GPL-3.0).
