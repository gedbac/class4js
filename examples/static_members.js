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

var result = Calculator.sum(2, 2);
