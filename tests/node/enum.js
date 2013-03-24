'use strict';

require('../../lib/class4js.js');

var Priority = $enum({
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
});

var index = 0;
for (var field in Priority) {
  switch(index) {
    case 0:
      console.assert(field == 'LOW');
      break;
    case 1:
      console.assert(field == 'NORMAL');
      break;
    case 2:
      console.assert(field == 'HIGH');
      break;
  }
  index++;
}

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
