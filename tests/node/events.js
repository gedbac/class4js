'use strict';

require('../../lib/class4js.js');

var EventEmitter = require('events').EventEmitter;

var app1 = new EventEmitter();

app1.on('click', function (e) {
  console.log("click" + e);
});

var app2 = new EventEmitter();

app2.on('click', function (e) {
  console.log("click" + e);
});

app1.emit('click', 1);
app2.emit('click', 2);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
