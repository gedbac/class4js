var TypeExtension = function (target, name, value) {
  this.__target = target;
  this.__name = name;
  this.__value = value;
  Object.seal(this);
};

TypeExtension.prototype = Object.create(Object.prototype, {

  target: {
    get: function () {
      return this.__target;
    },
    enumerable: true,
    configurable: false
  },

  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  value: {
    get: function () {
      return this.__value;
    },
    enumerable: true,
    configurable: false
  },

  toString: function () {
    return '[object class4js.TypeExtension]';
  }

});

Object.defineProperties(TypeExtension, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(TypeExtension);
Object.seal(TypeExtension.prototype);