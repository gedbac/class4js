/**
 * @interface {class4js.IDisposable}
 */
var IDisposable = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IDisposable}
   * @public
   * @method dispose
   */
  dispose: {
    value: function () { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.IDisposable}
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

Object.freeze(IDisposable);

exports.IDisposable = IDisposable;
