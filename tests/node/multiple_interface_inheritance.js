'use strict';

require('../../lib/class4js.js');

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

console.log("Interface 'IElement' members:");
for (var property in IElement) {
  console.log(property);
}

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
