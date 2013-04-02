'use strict';

var class4js = require('../../lib/class4js.js');

var drawInvoked = false;
var nameGetterInvoked = false;
var nameSetterInvoked = false;

var IComponent = $interface({
  name: {
    get: function () {},
    set: function (value) {}
  }
});

var IShape = $interface({
  draw: function () {}
}, IComponent);

var shapeProxy = $proxy(IShape, function (invocation) {
  if (invocation.name === 'draw' && invocation.isMethod) {
    drawInvoked = true;
  } else if (invocation.name === 'name' && invocation.isPropertyGetter) {
    nameGetterInvoked = true;
    return 'Item1'; 
  } else if (invocation.name === 'name' && invocation.isPropertySetter) {
    nameSetterInvoked = true;
  }
});

shapeProxy.draw();
shapeProxy.name = 'Item1';
var name = shapeProxy.name; 

console.assert($is(shapeProxy, IShape));
console.assert(drawInvoked);
console.assert(nameGetterInvoked);
console.assert(nameSetterInvoked);
console.assert(name === 'Item1');

drawInvoked = false;
nameGetterInvoked = false;
nameSetterInvoked = false;

var MyInterceptor = $class({

  intercept: function (invocation) {
    if (invocation.name === 'draw' && invocation.isMethod) {
      drawInvoked = true;
    } else if (invocation.name === 'name' && invocation.isPropertyGetter) {
      nameGetterInvoked = true;
      return 'Item1'; 
    } else if (invocation.name === 'name' && invocation.isPropertySetter) {
      nameSetterInvoked = true;
    }
  }

}, class4js.IInterceptor);

shapeProxy = $proxy(IShape, new MyInterceptor());

shapeProxy.draw();
shapeProxy.name = 'Item1';
var name = shapeProxy.name; 

console.assert($is(shapeProxy, IShape));
console.assert(drawInvoked);
console.assert(nameGetterInvoked);
console.assert(nameSetterInvoked);
console.assert(name === 'Item1');
