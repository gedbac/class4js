'use strict';

$run('Proxy', function () {

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
    // IsConstructor
    if (e.name === 'draw' && e.isMethod) {
      console.log('Method draw was invoked');
    } else if (e.name === 'name' && e.isPropertyGetter) {
      console.log('Property name get function was invoked');
      return 'Item1'; 
    } else if (e.name === 'name' && e.isPropertySetter) {
      console.log('Property name set function was invoked');
    }
  });

  shapeProxy.draw();
  shapeProxy.name = 'Item1';
  var value = shapeProxy.name; 
  console.log(value);

  $assert($is(shapeProxy, IShape));

  $complete('Proxy');

});
