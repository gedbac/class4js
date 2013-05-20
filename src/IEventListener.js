/**
 * @interface {class4js.IEventListener}
 */
var IEventListener = Object.create(Object.prototype, {

  toString: {
    value: function () {
      return '[object Interface]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IEventListener);

exports.IEventListener = IEventListener;
