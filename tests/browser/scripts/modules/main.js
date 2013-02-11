$run("Module", function () {

  'use strict';

  $configure({
    debug: true,
    modules: [{
      name: 'a',
      path: './scripts/modules/a.js'
    }, {
      name: 'b',
      path: './scripts/modules/b.js'
    }, {
      name: 'c',
      path: './scripts/modules/c.js'
    }, {
      name: 'd',
      path: '../browser/scripts/modules/d.js'
    }]
  });

  var test = { done: true };

  $module(function (a, b, t) { 
    $assert(typeof a.done !== 'undefined');
    $assert(typeof b.done !== 'undefined');
    $assert(typeof t.done !== 'undefined');
    $complete('Constant');
  }, ['a', 'b', test]);

});

