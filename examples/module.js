$config({
  debug: true,
  modules: [{
    name: 'a',
    path: './a.js'
  }]
});

var external_module = {};

var util = $module(function (fs, a, em, exports, global) {
  var Reader = $class({
    __construct__: function () {
    },  
    read: function () {
      console.log("Reading...");  
    }  
  }); 
  exports.Reader = Reader;
}, ['fs', 'a', external_module]);

var reader = new util.Reader();
reader.read();
