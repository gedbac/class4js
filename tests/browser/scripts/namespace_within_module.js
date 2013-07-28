$run("Namespace within module", function () {

  var myapp = $module(function (myapp, global) {

    $namespace('myapp.visual.common');

    $assert(myapp.visual.common);

    $complete("Namespace within module");

  });

});