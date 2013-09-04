if (typeof require !== 'undefined' && module !== null) {
  var class4js = require('../lib/class4js.js');
}

describe("$is keyword spec", function() {

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
  }, IShape);

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

  var IComponent = $interface({
    name: {
      get: function () {},
      set: function (value) {}
    }
  });

  var Component = $class({
    __construct__: function () {
      this.__name = null;
    },
    name: {
      get: function () {
        return this.__name;
      },
      set: function (value) {
        this.__name = value;
      }
    },
  }, IComponent);

  var shape = new Shape();
  var rec = new Rectangle();
  var component = new Component();

  it("object 'shape' has to implement an interface 'IShape'", function () {
    expect($is(shape, IShape)).toBeTruthy();
  });

  it("object 'shape' has to be an instance of class 'Shape'", function () {
    expect($is(shape, Shape)).toBeTruthy();
  });

  it("object 'rec' has to implement an interface 'IShape'", function () {
    expect($is(rec, IShape)).toBeTruthy();
  });

  it("object 'rec' has to be an instance of class 'Shape'", function () {
    expect($is(shape, Shape)).toBeTruthy();
  });

  it("object 'rec' has to implement an interface 'IRectangle'", function () {
    expect($is(rec, IShape)).toBeTruthy();
  });

  it("object 'rec' has to be an instance of class 'Rectangle'", function () {
    expect($is(shape, Shape)).toBeTruthy();
  });

  it("object 'component' has not to implement an interface 'IShape'", function () {
    expect($is(component, IShape)).toBeFalsy();
  });

  it("object 'component' has not to be an instance of class 'Shape'", function () {
    expect($is(component, Shape)).toBeFalsy();
  });

  it("object 'component' has not to implement an interface 'IRectangle'", function () {
    expect($is(component, IShape)).toBeFalsy();
  });

  it("object 'component' has not to be an instance of class 'Rectangle'", function () {
    expect($is(component, Shape)).toBeFalsy();
  });

  it("null has not to implement an interface 'IShape'", function () {
    expect($is(null, IShape)).toBeFalsy();
  });

  it("number has not to implement an interface 'IShape'", function () {
    expect($is(22, IShape)).toBeFalsy();
  });

  it("string has not to implement an interface 'IShape'", function () {
    expect($is('Shape', IShape)).toBeFalsy();
  });

  it("date has not to implement an interface 'IShape'", function () {
    expect($is(new Date(), IShape)).toBeFalsy();
  });

  it("boolean has not to implement an interface 'IShape'", function () {
    expect($is(true, IShape)).toBeFalsy();
  });

  it("object checking with undefined type has to throw an exception", function () {
    var func = function() {
      $is(shape, null);
    };
    expect(func).toThrow();
  });

  it("array has to be an instance of class 'Array'", function () {
    expect($is([], Array)).toBeTruthy();
  });

  it("created string object has to be an instance of class 'String'", function () {
    /* jshint -W053:false */
    expect($is(new String('Shape'), String)).toBeTruthy();
  });

  it("created date object has to be an instance of class 'Date'", function () {
    expect($is(new Date(), Date)).toBeTruthy();
  });

  it("created number object has to be an instance of class 'Number'", function () {
    /* jshint -W053:false */
    expect($is(new Number(22), Number)).toBeTruthy();
  });

  it("created boolean object has to be an instance of class 'Boolean'", function () {
    /* jshint -W053:false */
    expect($is(new Boolean(true), Boolean)).toBeTruthy();
  });

  it("created object has to be an instance of class 'Object'", function () {
    /* jshint -W010:false */
    expect($is(new Object(), Object)).toBeTruthy();
  });

  it("created function has to be an instance of class 'Function'", function () {
    /* jshint -W054:false */
    expect($is(new Function("a", "b", "return a + b"), Function)).toBeTruthy();
  });

  it("function has to be an instance of class 'Function'", function () {
    /* jshint -W054:false */
    expect($is(function () {}, Function)).toBeTruthy();
  });

  it("number '22' has to be a 'Number'", function () {
    expect($is(22, Number)).toBeTruthy();
  });

  it("string 'Shape' has to be a 'String'", function () {
    expect($is('Shape', String)).toBeTruthy();
  });

  it("boolean 'true' has to be a 'Boolean'", function () {
    expect($is(true, Boolean)).toBeTruthy();
  });

  it("interface 'IRectangle' has to implement an 'IShape' interface", function () {
    expect($is(IRectangle, IShape)).toBeTruthy();
  });

  it("class 'Rectangle' has to implement an 'IRectangle' interface", function () {
    expect($is(Rectangle, IRectangle)).toBeTruthy();
  });

  it("class 'Rectangle' has to be inherited from 'Shape' class", function () {
    expect($is(Rectangle, Shape)).toBeTruthy();
  });

  it("class 'Rectangle' has to be inherited from 'Rectangle' class", function () {
    expect($is(Rectangle, Rectangle)).toBeTruthy();
  });

  it("class 'Shape' can not be inherited from 'Rectangle' class", function () {
    expect($is(Shape, Rectangle)).toBeFalsy();
  });

});