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
    console.log("Drawing shape at: (" + this.x + ", " + this.y + ")");
  }
}, IDrawable);

var shape = new Shape();

console.log($is(shape, IDrawable));
