$run('Enum', function () {

  'use strict';

  var Priority = $enum({
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  });

  var index = 0;
  for (var field in Priority) {
    switch(index) {
      case 0:
        $assert(field == 'LOW');
        break;
      case 1:
        $assert(field == 'NORMAL');
        break;
      case 2:
        $assert(field == 'HIGH');
        break;
    }
    index++;
  }

  $complete('Enum');

});
