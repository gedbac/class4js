"use strict";

var class4js = require("../../lib/class4js.js");

"use strict";

console.log("=== Type checking sample: ===");

var IShape = $interface({
  x: {
    get: function () {},
    set: function (value) {}
  },
  y: {
    get: function () {},
    set: function (value) {}
  }
});

var Shape = $class({
  __construct__: function (x, y) {
    this.__x = x || 0;
    this.__y = y || 0;
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
}, null, IShape);

var IRectangle = $interface({
  width: {
    get: function () {},
    set: function (value) {}
  },
  height: {
    get: function () {},
    set: function (value) {}
  } 
}, IShape);

var Rectangle = $class({
  __construct__: function (x, y, width, height) {
    this.__width = width || 0;
    this.__height = height || 0;
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
  }
}, Shape, IRectangle);

var rec = new Rectangle(10, 10, 50, 50); 

console.log($is(rec, Rectangle));
console.log($is(rec, IRectangle));
