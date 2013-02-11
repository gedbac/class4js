$run('Enum', function () {

  'use strict';

  var Priority = $enum({
    low: 0,
    normal: 1,
    high: 2
  });

  var index = 0;
  for (var field in Priority) {
    switch(index) {
      case 0:
        $assert(field == 'low');
        break;
      case 1:
        $assert(field == 'normal');
        break;
      case 2:
        $assert(field == 'high');
        break;
    }
    index++;
  }

  $complete('Enum');

});
