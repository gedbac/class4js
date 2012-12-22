"use strict";

var class4js = require("../../lib/class4js.js");

console.log(class4js);

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

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
