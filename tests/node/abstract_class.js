'use strict';

require('../../lib/class4js.js');

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
    this.name = 'Button';
  }
}, Component)

var errorRaised = false;
try {
  var component = new Component(); 
} catch (ex) {
  errorRaised = true;
}
console.assert(errorRaised);

var button = new Button();

console.assert(button.name == 'Button');

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
