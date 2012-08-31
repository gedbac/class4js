"use strict";

require("class4js");

var Shape = $class({
  __construct__: function () {
  },
  draw: function () {
    console.log("Shape is drawn...");
  }
});

var Rectangle = $class({
  __construct__: function () {
  },
  draw: function () {
    this._super.draw();
    console.log("Rectangle is drawn...");
  }
}, Shape); 

var rec = new Rectangle();
rec.draw();
