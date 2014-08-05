var IEvent = Object.create(Object.prototype, {

  type: {
    get: function () {},
    set: function (value) {},
    enumerable: true,
    configurable: false
  },

  target: {
    get: function () {},
    set: function (value) {},
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object IEvent]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IEvent);

exports.IEvent = IEvent;