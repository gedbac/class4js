if (typeof require !== 'undefined' && module !== null) {
  var cls = require('../lib/class4js.js');
}

describe("Class spec", function() {

  var Shape = $class({

    __construct__: function (x, y) {
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

    toString: function () {
      return "[object Shape]";
    }

  });

  var Rectangle = $class({

    __construct__: function () {

    },

    toString: function () {
      return "[object Rectangle]";
    }

  }, Shape);

  it("should return constructor's source code", function () {
    expect(Shape.toString().indexOf("function")).toBe(0);
  });

  it("should return type name", function () {
    expect(new Shape().toString()).toBe("[object Shape]");
  });

  describe("Inherit class spec", function () {

    it("should return constructor's source code", function () {
      expect(Rectangle.toString().indexOf("function")).toBe(0);
    });

    it("should return type name", function () {
      expect(new Rectangle().toString()).toBe("[object Rectangle]");
    });

  });

  describe("Static class spec", function () {

    it("should return type name", function () {
      var Counter = $static_class({
        toString: function () {
          return "[object Counter]";
        }
      });
      expect(Counter.toString()).toBe("[object Counter]");
    });

    it("should return default type name", function () {
      var Counter = $static_class({});
      expect(Counter.toString()).toBe("[object Class]");
    });

  });

});