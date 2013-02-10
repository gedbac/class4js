'use strict';

var class4js = require('../../../lib/class4js.js');

$configure({
  debug: true,
  modules: [{
    name: 'a',
    path: '/home/gediminas/Dev/class4js/tests/node/circular_modules/a.js'
  }, {
    name: 'b',
    path: '/home/gediminas/Dev/class4js/tests/node/circular_modules/b.js'
  }, {
    name: 'c',
    path: '/home/gediminas/Dev/class4js/tests/node/circular_modules/c.js'
  }, {
    name: 'd',
    path: './d.js'
  }]
});

var test = { done: true };

$module(function (url, a, b, t) { 
  console.log('main starting');
  console.log('in main, url=%j, a=%j, b=%j, t=%j', typeof url !== "undefined", a.done, b.done, t.done);
}, ['url', 'a', 'b', test]);

