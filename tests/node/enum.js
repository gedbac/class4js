'use strict';

require('../../lib/class4js.js');

var Priority = $enum({
  low: 0,
  normal: 1,
  high: 2
});

var index = 0;
for (var field in Priority) {
  switch(index) {
    case 0:
      console.assert(field == 'low');
      break;
    case 1:
      console.assert(field == 'normal');
      break;
    case 2:
      console.assert(field == 'high');
      break;
  }
  index++;
}

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
