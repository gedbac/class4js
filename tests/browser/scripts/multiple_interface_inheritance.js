$run("Multiple interface inheritance", function () {

  "use strict";

  var IDisposable = $interface({
    dispose: function () {}
  });

  var IComponent = $interface({
    name: {
      get: function () {},
      set: function () {}
    }
  });

  var IElement = $interface({
    visible: { 
      get: function () {},
      set: function () {} 
    }
  }, [IDisposable, IComponent]);

  $print("Interface 'IElement' members:");
  for (var property in IElement) {
    $print(property);
  }

  $complete("Multiple interface inheritance");

});
