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
}, ['url', 'a', 'b', test]);

