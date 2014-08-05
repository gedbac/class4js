var ModuleException = function (message) {
  this.__name = 'ModuleException';
  this.__message = message || "A module exception has occurred.";
  Object.seal(this);
};

ModuleException.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  message: {
    get: function () {
      return this.__message;
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

Object.seal(ModuleException);
Object.seal(ModuleException.prototype);

exports.ModuleException = ModuleException;