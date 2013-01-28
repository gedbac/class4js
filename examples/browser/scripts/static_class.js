$run("Static Class", function () {

  "use strict";

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
  $assert(Counter.current == 1);

  $complete("Static Class");

});
