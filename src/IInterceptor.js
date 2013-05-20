/**
 * @interface {class4js.IInterceptor}
 */
var IInterceptor = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IInterceptor}
   * @public
   * @method intercept
   * @param {IInvocation} invocation
   */
  intercept: {
    value: function (invocation) { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.IInterceptor}
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

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;
