$run("Abstract Class", function () {

  "use strict";

  var Component = $abstract_class({
    __construct__: function () { 
      this.__name = "Component";
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

  var Button = $class({
    __construct__: function () {
      this.name = "Button";
    }
  }, Component)

  var errorRaised = false;
  try {
    var component = new Component(); 
  } catch (ex) {
    errorRaised = true;
  }
  $assert(errorRaised);

  var button = new Button();

  $assert(button.name == "Button");

  $complete("Abstract Class");

});
