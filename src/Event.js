var Event = function () {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

Event.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function () {
      this.__type = null;
      this.__target = null;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  type: {
    get: function () { 
      return this.__type;
    },
    set: function (value) { 
      this.__type = value;
    },
    enumerable: true,
    configurable: false
  },

  target: {
    get: function () {
      return this.__target;
    },
    set: function (value) {
      this.__target = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.Event]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }
  
});

Object.defineProperties(Event, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Event);
Object.seal(Event.prototype);

exports.Event = Event;