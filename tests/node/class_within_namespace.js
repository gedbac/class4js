'use strict';

require("../../lib/class4js.js");

$namespace('myapp.visual', {
  Shape: $class({
    __construct__: function () {

    },
    draw: function () {

    }
  })
});

console.assert(myapp.visual.Shape);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}