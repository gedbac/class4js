var IEventTarget = Object.create(Object.prototype, {

  addEventListener: {
    value: function (type, listener) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  removeEventListener: { 
    value: function (type, listener) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  dispatchEvent: { 
    value: function (e) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Interface]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IEventTarget);

exports.IEventTarget = IEventTarget;
