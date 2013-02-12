'use strict';

require("../../lib/class4js.js");

var IComponent = $interface({ 
  id: {
    get: function () {}
  }
});

var IDrawable = $interface({
  visible: {
    get: function () {}
  },
  drawOrder: {
    get: function () {}
  },
  draw: function (context) {} 
}, IComponent);

var Rectangle = $class({

  __construct__: function (visible, drawOrder) {
    this.__id = 10;
    this.__visible = visible;
    this.__drawOrder = drawOrder;
  },

  id: {
    get: function () {
      return this.__id;
    }
  },

  visible: {
    get: function () {
      return this.__visible;
    }
  },

  drawOrder: {
    get: function () {
      return this.__drawOrder;
    }
  },

  draw: function (context) {
    console.log("Rectangle is drawn...");
  }

}, null, IDrawable);

var rec = new Rectangle(true, 10);

console.assert($is(rec, IDrawable));

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
