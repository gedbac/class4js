/**
 * @class {class4js.TypeException}
 * @constructor {class4js.TypeException}
 * @param {String} message
 */
var TypeException = function (message) {
  this.__name = 'TypeException';
  this.__message = message;
  Object.seal(this);
};

TypeException.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.TypeException}
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
   * @memberOf {class4js.TypeException}
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
   * @memberOf {class4js.TypeException}
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

Object.seal(TypeException);
Object.seal(TypeException.prototype);

exports.TypeException = TypeException;
