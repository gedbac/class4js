(function () {

  "use strict";
 
  var ICollection = $interface({
  
    items: function() {
    }
  
  });

  var Collection = $class({
    
    __construct__: function (items) {
      this.__items = items;
    },

    items: function () {
      return this.__items;
    }

  });

  $extend(ICollection, "forEach", function (callback) {
    if (callback) {
      for (var i = 0; i < this.items().length; i++) {
        callback(this.items()[i]);
      } 
    } 
  });
  
  var collection = new Collection([1, 2, 3]);

  collection.forEach(function (item) {
    console.log(item);
  });

}());
