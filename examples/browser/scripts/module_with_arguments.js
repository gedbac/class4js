 (function () { 

  "use strict";

  console.log("=== Module with arguments example: ===");

  var util = $module(function (exports, global) {

    global.myVariable = 42; 

  }, [window]);

  console.log(myVariable);

}());
