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
  },
  draw: function () {
    console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
  }, 
  moveTo: function (x, y) {
    this.x = x;
    this.y = y;
  }
});

var shape = new Shape({ x: 100, y: 100 });
shape.moveTo(120, 85);
