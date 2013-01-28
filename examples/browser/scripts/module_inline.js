$run("Module Inline", function () {

  var util = $module(function (exports) {
  
      var Reader = $class({
       
        __construct__: function () {
        },
    
        read: function () {
          return "#TEXT";
        } 
      
      }); 

      exports.Reader = Reader;

  });

  var reader = new util.Reader();
  var result = reader.read();

  $assert(result === "#TEXT");

  $complete("Module Inline");

});
