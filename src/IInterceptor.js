var IInterceptor = Object.create(Object.prototype, {

  intercept: {
    value: function (invocation) { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object IInterceptor]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;