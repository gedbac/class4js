$run("Inheritance", function () {

  "use strict";

  var Shape = $class({
    __construct__: function () {
      $print("Shape constructor was invoked...");
    },
    draw: function () {
      $print("Shape is drawn...");
    }
  });

  var Rectangle = $class({
    __construct__: function () {
      $print("Rectangle constructor was invoked...");
    },
    draw: function () {
      this._super.draw();
      $print("Rectangle is drawn...");
    }
  }, Shape); 

  var rec = new Rectangle();
  rec.draw();

  $complete("Inheritance");

});
