'use strict';

require('../../../lib/class4js.js');

$configure({
  debug: true,
  modules: [{
    name: 'a',
    path: './a.js'
  }, {
    name: 'b',
    path: './b.js'
  }, {
    name: 'c',
    path: './c.js'
  }, {
    name: 'd',
    path: '../modules/d.js'
  }]
});

var test = { done: true };

$module(function (url, a, b, t) { 
  console.log('in main, url=%j, a=%j, b=%j, t=%j', typeof url !== "undefined", a.done, b.done, t.done);

  console.assert(typeof a.shared !== 'undefined');
  console.assert(typeof b.shared !== 'undefined');

}, ['url', 'a', 'b', test]);

