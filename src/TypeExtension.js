/**
 * @internal
 * @class {class4js.TypeExtension}
 * @constructor {class4js.TypeExtension}
 * @param {Object} target
 * @param {String} name
 * @param {Function} value
 */
var TypeExtension = function (target, name, value) {
  this.__target = target;
  this.__name = name;
  this.__value = value;
  Object.seal(this);
};

TypeExtension.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.TypeExtension}
   * @public
   * @property {Object} target
   */
  target: {
    get: function () {
      return this.__target;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeExtension}
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
   * @memberOf {class4js.TypeExtension}
   * @public
   * @property {Function} value
   */
  value: {
    get: function () {
      return this.__value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeExtension}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: function () {
    return '[object class4js.TypeExtension]';
  }

});

Object.defineProperties(TypeExtension, {

  /**
   * @memberOf {class4js.TypeExtension}
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

Object.seal(TypeExtension);
Object.seal(TypeExtension.prototype);
