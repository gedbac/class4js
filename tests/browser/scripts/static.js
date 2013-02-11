$run('Static', function () {  

  'use strict';

  var Calculator = $class({
    __static__: {
      sum: function (a, b) {
        return a + b;
      },
      subtract: function (a, b) {
        return a - b;
      }
    }
  }); 

  $assert(Calculator.sum(2, 2) == 4);
  $assert(Calculator.subtract(8, 4) == 4);

  $complete('Static');

});
