$run('Class within namespace', function () {

  'use strict';

  $namespace('myapp.visual', {
    Shape: $class({
      __construct__: function () {

      },
      draw: function () {

      }
    })
  });

  $assert(myapp.visual.Shape);

  $complete('Class within namespace');

});