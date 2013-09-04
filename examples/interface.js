var IComponent = $interface({
  name: {
    get: function () {}
  }
});

var IDrawable = $interface({
  draw: function (context) {}
}, IComponent);

var Shape = $class({
  __construct__: function () {
    this.__name = 'Shape';
  },
  name: {
    get: function () {
      return this.__name;
    }
  },
  draw: function () {
    // Your code goes here...
  }
}, IDrawable);

var shape = new Shape();