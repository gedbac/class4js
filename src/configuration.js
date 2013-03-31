/**
 * @class {class4js.Configuration}
 * @constructor {class4js.Configuration}
 */
var Configuration = function () {
  this.__debug = false;
  this.__basePath = null;
  this.__modules = [];
  Object.seal(this);
};

Configuration.prototype = Object.create(Object.prototype, {

  /**
   * @class {class4js.Configuration}
   * @public
   * @property {Boolean} debug 
   */
  debug: {
    get: function () {
      return this.__debug;
    },
    set: function (value) {
      this.__debug = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @class {class4js.Configuration}
   * @public
   * @property {String} basePath
   */
  basePath: {
    get: function () {
      return this.__basePath;
    },
    set: function (value) {
      this.__basePath = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @class {class4js.Configuration}
   * @public
   * @property {class4js.ModuleConfiguration[]} modules
   */
  modules: {
    get: function () {
      return this.__modules;
    },
    set: function (value) {
      if (value) {
        for (var i = 0; i < value.length; i++) {
          this.__modules.push(ObjectFactory.create(ModuleConfiguration, value[i]));
        } 
      } else {
        this.__modules = [];
      }
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Configuration}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object class4js.Configuration]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Configuration, {

  /**
   * @memberOf {class4js.Configuration}
   * @static
   * @private
   * @field {Configuration} __configuration
   */ 
  __configuration: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Configuration}
   * @static
   * @public
   * @property {Boolean} debug 
   */
  debug: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.debug;
      }
      return false;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Configuration}
   * @static
   * @public
   * @property {String} basePath
   */
  basePath: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.basePath;
      }
      return null;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Configuration}
   * @static
   * @public
   * @property {String} modules
   */
  modules: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.modules;
      }
      return null;
    },
    enumerable: true,
    configure: false
  },

  /**
   * @memberOf {class4js.Configuration}
   * @static
   * @public
   * @method configure
   * @param {class4js.Configuration} configuration
   */
  configure: {
    value: function (configuration) {
      Configuration.__configuration = ObjectFactory.create(Configuration, configuration); 
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Configuration);
Object.seal(Configuration.prototype);

global.$configure = Configuration.configure;

exports.Configuration = Configuration;
