$run('Constant', function () {

  'use strict';
  
  var Person = $class({
    MAX_AGE: 99,
    TEMPLATE: '{template}',
    __construct__: function () {
    }
  });

  $assert(Person.MAX_AGE == 99);
 
  $complete('Constant');

});
