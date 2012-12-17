/**
 * @static
 * @class {class4js.Module}
 */
var Module = Object.create(null, {

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method create
   * @param {Function} scope
   * @returns {Object}
   */
  create: {
    value: function (scope) {
      var module = {};
      if (scope) {
        scope(module);
      }
      return module;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }
      
});
Object.freeze(Module);

global.$module = Module.create;

exports.Module = Module;

