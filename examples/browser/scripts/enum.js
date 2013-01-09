(function () {

  "use strict";

  var Priority = $enum({
    low: 0,
    normal: 1,
    high: 2
  });

  for (var field in Priority) {
    console.log(field);
  }

}());
