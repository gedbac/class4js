'use strict';

require('../../lib/class4js.js');

var myapp = $module(function (myapp, global) {

  $namespace('myapp.visual.common');

  console.assert(myapp.visual.common);

});

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}