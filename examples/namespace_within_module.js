var myapp = $module(function (myapp) {

  $namespace('myapp.visual.common');

  myapp.visual.common.Button = $class({
    // Code goes here....
  });

  // Alternativlu you can write it in such manner
  $namespace('myapp.visual.common', {

    Button: $class({
      // Code goes here....
    })

  });

});

(function () {

  'use strict';

  // In other scope local variable, which will point to the desired 
  // class, can be created 

  var button = myapp.visual.common.Button;

}());
