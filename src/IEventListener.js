var IEventListener = Object.create(Object.prototype, {

  handleEvent: {
    value: function (e) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object IEventListener]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IEventListener);

exports.IEventListener = IEventListener;