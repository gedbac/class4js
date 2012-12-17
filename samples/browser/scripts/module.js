 (function () { 

  "use strict";

  console.log("=== Module sample: ===");

  var util = $module(function (exports) {

    var Reader = $class({
     
      __construct__: function () {
      },

      read: function () {
        console.log("Reading...");  
      } 
    
    }); 

    exports.Reader = Reader;

  });

  var reader = new util.Reader();
  reader.read();

}());
