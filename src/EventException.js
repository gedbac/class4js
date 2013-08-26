var EventException = function (message) {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

EventException.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function (message) {
      this.__name = 'EventException';
      this.__message = message || "An event exception has occurred.";
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  message: {
    get: function () {
      return this.__message;
    },
    set: function (value) {
      this.__message = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return this.name + ': ' + this.message;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(EventException, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(EventException);
Object.seal(EventException.prototype);

exports.EventException = EventException;