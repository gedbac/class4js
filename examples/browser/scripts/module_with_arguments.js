 $run("Module with Arguments", function () { 

  "use strict";

  $module(function (global, exports) {

    $assert(global === window); 

  }, [window]);

  $complete("Module with Arguments");

});
