/**
 * @interface {class4js.IEventListener}
 */
var IEventListener = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IEventListener}
   * @public
   * @method handleEvent
   */
  handleEvent: {
    value: function (e) { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.IEventListener}
   * @public
   * @method toString
   * @returns {String}
   */
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
