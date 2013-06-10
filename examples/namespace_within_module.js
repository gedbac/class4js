var myapp = $module(function () {

  $namespace('visual.shared');

  visual.shared.Element = $class({
    // Code goes here....
  });

});

(function () {

  // In other scope local variable, which will point to the desired 
  // class, can be created 

  var Element = myapp.visual.shared.Element;

}());
