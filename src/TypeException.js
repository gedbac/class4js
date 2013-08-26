var TypeException = function (message) {
  this.__name = 'TypeException';
  this.__message = message || "A type exception has occurred.";
  Object.seal(this);
};

TypeException.prototype = Object.create(Object.prototype, {

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