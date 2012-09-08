"use strict";

var class4js = require("../lib/class4js.js");

var IDrawable = $interface({

  visible: {
    get: function () {
    }
  },

  drawOrder: {
    get: function () {
    }
  },

  draw: function (context) {
  } 

});

var Rectangle = $class({
  __construct__: function (visible, drawOrder) {
    this.__visible = visible;
    this.__drawOrder = drawOrder;
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

console.log($is(rec, IDrawable));
