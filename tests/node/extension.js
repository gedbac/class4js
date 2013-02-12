'use strict';

require('../../lib/class4js.js');

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

$extend(ICollection, 'forEach', function (callback) {
  if (callback) {
    for (var i = 0; i < this.items().length; i++) {
      callback(this.items()[i]);
    } 
  } 
});

var collection = new Collection(['1', '2', '3']);

var index = 0;
collection.forEach(function (item) {
  switch (index) {
    case 0:
      console.assert(item == '1');
      break;
    case 1:
      console.assert(item == '2');
      break;
    case 2:
      console.assert(item == '3');
      break;
  }
  index++;
});

// It's required for PhantomJS
if (typeof phantom !== "undefined") {
  phantom.exit();
}
