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
  }
});

var Rectangle = $class({
  __construct__: function () {
    this.__width = 0;
    this.__height = 0;
  },
  width: {
    get: function () {
      return this.__width;
    },
    set: function (value) {
      this.__width = value;
    }
  },
  height: {
    get: function () {
      return this.__height;
    },
    set: function (value) {
      this.__height = value;
    }
  },
  draw: function () {
    this.__super.draw();
    console.log("Drawing rectangle (" + this.width + ", " + this.height 
      + ") at: (" + this.x + ", " + this.y + ")");
  }
}, Shape);

var shape = new Shape({ x: 100, y: 100, with: 50, height: 50 });
shape.draw();
