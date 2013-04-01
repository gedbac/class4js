'use strict';

$run('Class Proxy', function () {

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
      return { x: context.x + 10, y: context.y + 10 };
    }
  }, Component);

  var proxy = $proxy(Shape, function (invocation) { 
    console.log("Property was invoked: " + invocation.name);
    return invocation.procceed(); 
  });

  //proxy.name = 'item1';
  //var name = proxy.name;
  //$assert(name === 'item1');

  //var result = proxy.draw({ x: '50', y: '50' });
  //console.log(result);

  $complete('Class Proxy');

});
