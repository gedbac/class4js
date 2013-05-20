/**
 * @class {class4js.ModuleException}
 * @constructor {class4js
 */
var ModuleException = function (message) {
  this.__name = 'ModuleException';
  this.__message = message;
  Object.seal(this);
};

ModuleException.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.ModuleException}
   * @public
   * @property {String} name
   */
  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ModuleException}
   * @public
   * @property {String} message
   */
  message: {
    get: function () {
     return this.__message;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ModuleException}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return this.name + ': ' + this.message;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(ModuleException, {

  /**
   * @memberOf {class4js.ModuleException}
   * @static
   * @private
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleException);
Object.seal(ModuleException.prototype);

exports.ModuleException = ModuleException;
