var TypeException = function () {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

TypeException.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function (TypeException) {
      this.__name = 'TypeException';
      this.__message = message || "A type exception has occurred.";
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

Object.defineProperties(TypeException, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(TypeException);
Object.seal(TypeException.prototype);

exports.TypeException = TypeException;