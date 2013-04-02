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
      $print("Shape '" + this.name +"' is drawn... [status: " + context.status + " ]");
    }
  }, Component);

  var Rectangle = $class({
    __construct__: function () {
      
    },
    draw: function ($super, context) {
      $super.draw(context);
      $print("Rectangle '" + this.name + "' is drawn... [status: " + context.status + " ]");
    }
  }, Shape);

  var proxy = $proxy(Rectangle, function (invocation) { 
    $print(invocation.name);
    return invocation.procceed(); 
  }, { name: 'MyRectangle' });

  proxy.draw({ status: 'OK' });

  proxy.name = 'item1';
  var name = proxy.name;
  $assert(name === 'item1');

  $complete('Class Proxy');

});
