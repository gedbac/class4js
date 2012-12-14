"use strict";

var class4js = require("../../lib/class4js.js");

console.log("=== Multiple interface inheritance usage sample: ===");

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