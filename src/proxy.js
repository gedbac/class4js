/**
 * @static
 * @class {class4js.Proxy}
 */
var Proxy = Object.create(null, {

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @public
   * @param {Function} type
   * @param {Object} interceptors
   * @method create
   * @returns {Function}
   */
  create: {
    value: function (type, interceptors) {
      var constructor = function () {
        // TODO: Invoke parents constructor
        Object.seal(this);
      };
      // TODO: Inherit from base type
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});
Object.freeze(Proxy);

global.$proxy = Proxy.create;

exports.Proxy = Proxy;
