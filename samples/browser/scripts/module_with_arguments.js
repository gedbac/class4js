 (function () { 

  "use strict";

  console.log("=== Module with arguments sample: ===");

  var util = $module(function (exports, global) {

    global.myVariable = 42; 

  }, [window]);

  console.log(myVariable);

}());
