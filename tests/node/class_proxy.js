'use strict';

var class4js = require('../../lib/class4js.js');

var Component = $class({
  __construct__: function () {
    this.__name = null; 
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

var Shape = $class({
  __construct__: function () {
  
  },
  draw: function (context) {
    console.log("Shape '" + this.name +"' is drawn... [status: " + context.status + " ]");
  }
}, Component);

var Rectangle = $class({
  __construct__: function () {
    
  },
  draw: function ($super, context) {
    $super.draw(context);
    console.log("Rectangle '" + this.name + "' is drawn... [status: " + context.status + " ]");
  }
}, Shape);

var proxy = $proxy(Rectangle, function (invocation) { 
  console.log(invocation.name);
  return invocation.procceed(); 
}, { name: 'MyRectangle' });

proxy.draw({ status: 'OK' });

proxy.name = 'item1';
var name = proxy.name;
console.assert(name === 'item1');

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
