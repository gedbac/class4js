(function () {

  "use strict";

  var Shape = $class({
    __construct__: function () {
      console.log("Shape constructor was invoked...");
    },
    draw: function () {
      console.log("Shape is drawn...");
    }
  });

  var Rectangle = $class({
    __construct__: function () {
      console.log("Rectangle constructor was invoked...");
    },
    draw: function () {
      this._super.draw();
      console.log("Rectangle is drawn...");
    }
  }, Shape); 

  var rec = new Rectangle();
  rec.draw();

}());
