$run('Event', function () {

  'use strict';

  var Button = $class({
    __construct__: function () {

    }
  });

  var btn = new Button();
  btn.on('click', function (e) {
    console.log('clicked...');
    $complete('Event');
  });
  btn.fire('click');

});