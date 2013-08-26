var Configuration = function () {
  this.__debug = false;
  this.__basePath = null;
  this.__modules = [];
  Object.seal(this);
};

Configuration.prototype = Object.create(Object.prototype, {

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

  __configuration: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

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

  configure: {
    value: function (options) {
      Configuration.__configuration = ObjectFactory.create(Configuration, options);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Class]';
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