var IComponent = $interface({ 
  name: {
    get: function () {}
  }
});

var IDrawable = $interface({
  draw: function (context) {} 
}, IComponent);

var Shape = $class({
  draw: function () {
    // Your code goes here... 
  }
}, IDrawable);

var shape = new Shape();

console.log($is(shape, IDrawable));
