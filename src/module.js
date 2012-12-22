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
   * @param {Function} arguments
   * @param {Function} scope
   * @param {Array} args
   * @returns {Object}
   */
  create: {
    value: function (scope, args) {
      var module = {};
      if (scope) {
        if (args) {
          if (!(args instanceof Array)) {
            throw new TypeException("Type of parameter 'args' is invalid");
          }
          args.splice(0, 0, module);
          scope.apply(this, args); 
        } else {
          scope(module);
        }
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

