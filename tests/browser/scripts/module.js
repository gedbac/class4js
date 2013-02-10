$run("Module", function () {

  "use strict";

  $configure({
    debug: true
  });

  $module(function (module2, module3, exports) {

    $print("Anonymous module was loaded");
  
    $assert(exports);
    $assert(module2);
    $assert(module2.version === "module2");
    $assert(module3); 
    $assert(module3.version === "module3");

    $complete("Module");

  }, ["module2", "module3"]);

});

