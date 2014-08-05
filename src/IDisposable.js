var IDisposable = Object.create(Object.prototype, {

  dispose: {
    value: function () {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object IDisposable]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IDisposable);

exports.IDisposable = IDisposable;