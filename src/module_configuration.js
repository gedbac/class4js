/**
 * @class {class4js.ModuleConfiguration}
 * @constructor {class4js.ModuleConfiguration}
 */
var ModuleConfiguration = function () {
  this.__name = null;
  this.__path = null;
  Object.seal(this);
};

ModuleConfiguration.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.ModuleConfiguration}
   * @public
   * @property {String} name
   */
  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ModuleConfiguration}
   * @public
   * @property {String} path
   */
  path: {
    get: function () {
      return this.__path;
    },
    set: function (value) {
      this.__path = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ModuleConfiguration}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return 'class4js.ModuleConfiguration';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleConfiguration);
Object.seal(ModuleConfiguration.prototype);

exports.ModuleConfiguration = ModuleConfiguration;
