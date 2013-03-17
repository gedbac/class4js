/**
 * @interface {class4js.IInterceptor}
 */
var IInterceptor = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IInterceptor}
   * @public
   * @method intercept
   */
  intercept: {
    value: function () { },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;
