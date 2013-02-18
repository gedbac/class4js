var Shape = $class({
  __construct__: function () {
    this.__x = 0;
    this.__y = 0;
  },
  x: {
    get: function () {
      return this.__x;
    },
    set: function (value) {
      this.__x = value;
    }
  },
  y: {
    get: function () {
      return this.__y;
    },
    set: function (value) {
      this.__y = value;
    }
  }
});

var shape = new Shape();
$init(shape, { x: 10, y: 10 });
