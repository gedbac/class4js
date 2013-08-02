'use strict';

var class4js = require('../../lib/class4js.js');

var eventRaised = false;

var Button = $class({
  __events__: {
    click: class4js.Event
  },
  __construct__: function () {

  }
});

var btn = new Button();
btn.on('click', function (e) {
  eventRaised = true;
});
btn.fire('click');

btn.removeAllEventListeners();

setTimeout(function () {

  console.assert(eventRaised);
  
  // It's required for PhantomJS
  if (typeof phantom !== 'undefined') {
    phantom.exit();
  }

}, 0);