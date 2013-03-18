'use strict';

$run('Interface Proxy', function () {

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

  var shapeProxy = $proxy(IShape, function (e) {
    if (e.name === 'draw' && e.isMethod) {
      drawInvoked = true;
    } else if (e.name === 'name' && e.isPropertyGetter) {
      nameGetterInvoked = true;
      return 'Item1'; 
    } else if (e.name === 'name' && e.isPropertySetter) {
      nameSetterInvoked = true;
    }
  });

  shapeProxy.draw();
  shapeProxy.name = 'Item1';
  var name = shapeProxy.name; 

  $assert($is(shapeProxy, IShape));
  $assert(drawInvoked);
  $assert(nameGetterInvoked);
  $assert(nameSetterInvoked);
  $assert(name === 'Item1');

  var IMyInterceptor = $class({

    intercept: function (invocation) {
    }

  }, class4js.IInterceptor);

  $complete('Proxy');

});
