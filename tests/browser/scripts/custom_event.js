$run('Custom Event', function () {

  'use strict';

  var PropertyChangedEvent = $class({
    __construct__: function () {
      this.__propertyName = null;
    },
    propertyName: {
      get: function () {
        return this.__propertyName;
      }, 
      set: function (value) {
        this.__propertyName = value;
      }
    }
  }, class4js.Event);

  var INotifyPropertyChanged = $interface({
    notifyPropertyChanged: function (propertyName) {}
  });

  var Entity = $class({
    __events__: {
      propertyChanged: PropertyChangedEvent
    },
    __construct__: function () {
      this.__name = null;
    },
    name: {
      get: function () {
        return this.__name;
      },
      set: function (value) {
        if (value !== this.__name) {
          this.__name = value;
          this.notifyPropertyChanged('name');
        }
      }
    },
    notifyPropertyChanged: function (propertyName) {
      this.fire('propertyChanged', { propertyName: propertyName });
    }
  }, INotifyPropertyChanged);

  var Message = $class({
    __events__: {
      messageSend: class4js.Event
    },
    __construct__: function () {

    },
    sendMessage: function () {
      this.fire('messageSend');
    }
  }, Entity);

  var msg = new Message();
  msg.on('propertyChanged', function (e) {
    $assert(e.propertyName === 'name');
    $complete('Custom Event');
  });
  msg.name = 'my-name';

});