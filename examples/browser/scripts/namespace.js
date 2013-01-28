$run("Namespace", function () {

  "use strict";

  $namespace("org.myapp.util");

  org.myapp.util = (function () {

    var util = {};

    return util;

  }());

  $assert(org);

  $complete("Namespace");

});
