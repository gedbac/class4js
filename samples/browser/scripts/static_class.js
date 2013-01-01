(function () {

  "use strict";

  console.log("=== Static class: ===");

  var Counter = $static_class({
    __construct__: function () {
      this.__value = 0;
    },
    increment: function () {
      this.__value++;
    },
    current: {
      get: function () {
        return this.__value;
      }
    }
  });

  Counter.increment();
  console.log(Counter.current);

}());
