$run('Event', function () {

  'use strict';

  var Component = $class({
    __construct__: function () {
      this.__name = 'test';
    },
    method1: function () {

    },
    method2: function () {

    }
  });

  var Button = $class({
    method1: function ($super) {
      $super.method1();
    },
    method2: function ($super) {
      $super.method2();
    }
  }, Component);

  var btn = new Button();
  btn.method1();
  btn.method2();

  btn.on('click', function (e) {
    console.log('clicked...');
  });
  btn.fire({ 
    type: 'click', 
    target: btn 
  });
   
  /*var Button = $class({
    __construct__: function () {

    }
  });

  var button = new Button();
  button.on('click', function (e) {
    $complete('Extension');
  });

  button.fire({
    target: button,
    type: 'click'
  });*/

  var dispatcher = new class4js.EventDispatcher();
  dispatcher.addEventListener('click', function (e) {
    $complete('Event');
  });
  /*dispatcher.dispatch({
    target: this,
    type: 'click'    
  });*/
  dispatcher.dispatchEvent(new class4js.Event({
    target: this,
    type: 'click'
  }));

});