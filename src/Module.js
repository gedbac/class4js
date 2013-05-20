/**
 * @class {class4js.Module}
 * @constructor {class4js.Module}
 * @param {String} name
 */
var Module = function (name) {
  this.__name = name; 
  this.__loaded = false;
  this.__value = {};
  this.__loadedListeners = [];
  Object.seal(this);
};

Module.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.Module}
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
   * @memebtOf {class4js.Module}
   * @public
   * @property {Object} value
   */
  value: {
    get: function () {
      return this.__value;
    },
    set: function (value) {
      this.__value = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @public
   * @property {Boolean} isLoaded
   */
  isLoaded: {
    get: function () {
      return this.__loaded;
    },
    set: function (value) {
      this.__loaded = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @public
   * @method on
   * @param {String} name
   * @param {Function} callback
   */
  on: {
    value: function (name, callback) {
      if (!name || name !== 'loaded') {
        throw new ModuleException("Event's name is not set or name's type is invalid");
      }
      if (!callback || typeof callback !== 'function') {
        throw new ModuleException("Callback is not set or it's type invalid");
      }
      this.__loadedListeners.push(callback); 
    },
    writable: false,
    enumerable: true,
    configurable: false  
  },

  /**:vs
   * @memberOf {class4js.Module}
   * @public
   * @method fire
   * @param {String} name
   */
  fire: {
    value: function (name) {
      if (!name || name !== 'loaded') {
        throw new ModuleException("Event's name is not set or name's type is invalid");
      }
      this.__loaded = true;
      for (var i = 0; i < this.__loadedListeners.length; i++) {
        this.__loadedListeners[i].call(this, this.value);
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object class4js.Module]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Module, {

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @field {class4js.Module[]} __modules
   */
  __modules: {
    value: [],
    writable: true,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @field {class4js.Module} __current
   */
  __current: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method create
   * @param {Function} callback
   * @param {Function} dependencies
   * @returns {Object}
   */
  create: {
    value: function (callback, dependencies) {
      if (!Module.__current) {
        Module.__current = new Module('main');
      }
      var definition = Module.__current;
      if (Configuration.debug) {
        console.log("Creating module '" + definition.name + "'");
      }
      var args = [];   
      var onLoaded = function () {
        args.push(definition.value);
        args.push(global);
        callback.apply(null, args);
        definition.isLoaded = true;
        if (Configuration.debug) {
          console.log("Module '" + definition.name + "' was created");
        }
        definition.fire('loaded');
      };
      if (dependencies && dependencies.length > 0) {
        var index = 0;
        var fn = function (dependency) {
          args.push(dependency);
          index++;
          if (index < dependencies.length) {
            Module.__loadDependency(dependencies[index], fn);
          } else {
            onLoaded();
          }
        };
        Module.__loadDependency(dependencies[index], fn);
      } else {
        onLoaded();
      }
      return definition.value; 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method isLoaded
   * @param {String} name
   */
  isLoaded: {
    value: function (name) {
      if (name && typeof name === 'string') {
        var handler = Module.__find(name);
        if (handler) {
          return handler.isLoaded;
        }
      } else {
        throw new ModuleException("Type of parameter 'name' is invalid");
      }
    },
    writable: true,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method load
   * @param {String} name
   * @param {Function} callback
   */
  load: {
    value: function (name, callback) {
      if (name) {
        if (!Module.isValidModuleName(name)) {
          throw new TypeException("Module's name '" + name + "' is invalid");
        }
        var definition = Module.__find(name);
        if (definition) {
          if (definition.isLoaded) {
            if (Configuration.debug) {
              console.log("Module '" + name + "' was returned from cache");
            }
            if (callback) {
              callback(definition.value);
            }
          } else {
            throw new ModuleException("Circular reference for module '" + 
              name + "' was detected"); 
          }  
        } else {
          if (Configuration.debug) {
            console.log("Loading module '" + name + "'");
          } 
          definition = new Module(name);
          Module.__current = definition;
          Module.__modules.push(definition);
          Module.__loadScript(definition, function () {
            if (Configuration.debug) {
              console.log("Module '" + name + "' was loaded");
            }
            if (callback) {
              callback(definition.value);
            }
          });
        }
      } else {
        throw new ModuleException("Module's name is not set");  
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method isValidModuleName
   * @param {String} name
   */
  isValidModuleName: {
    value: function (name) {
      return /^(_|[a-z]|[A-Z]|[0-9]|)*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method __loadMainModule
   */
  __loadMainModule: {
    value: function () {
      if (!Module.__hasRequire()) {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0;i < scripts.length; i++) {
          var mainScript = scripts[i].getAttribute('data-main');
          if (mainScript) {
            var script = document.createElement('script');
            script.async = true;
            script.src = mainScript; 
            script.addEventListener('error', function (e) {
              throw new ModuleException("Failed to load module '" + mainScript + "'");
            });
            scripts[i].parentNode.appendChild(script);
            break;
          }
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @method __loadDependency
   * @param {String} name
   * @param {Function} callback
   */
  __loadDependency: {
    value: function (name, callback) {
      if (typeof name === 'string') {
        Module.load(name, function (dependency) {
          callback(dependency); 
        });
      } else {
        callback(name);
      } 
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @method __find
   * @param {String} name
   * @returns {Object}
   */
  __find: {
    value: function (name) {
      if (name && typeof name === 'string') {
        for (var i = 0; i < Module.__modules.length; i++) {
          if (Module.__modules[i].name === name) {
            return Module.__modules[i];     
          }
        }
      }
      return null; 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @method
   * @param {class4js.Module} definition
   * @param {Function} callback
   */
  __loadScript: {
    value: function (definition, callback) {
      var path = Module.__getModulePath(definition.name); 
      if (Module.__hasRequire()) {
        var exported = require(path);
        if (!definition.isLoaded) {
          definition.value = exported;
          definition.isLoaded = true;
        }
        callback();
      } else {
        var script = document.createElement('script');
        script.async = true;
        script.src = path; 
        script.addEventListener('error', function (e) {
          throw new ModuleException("Failed to load module '" + definition.name + "'");
        });
        definition.on('loaded', function () {
          callback();
        });
        var head = document.getElementsByTagName('head')[0];
        if (head) {
          head.appendChild(script);
        } else {
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method __getModulePath
   * @param {String} name
   * @returns {String}
   */
  __getModulePath: {
    value: function (name) {
      var path = name;
      if (!Module.__hasRequire()) {
        path = './scripts/' + name + '.js';
      }
      if (Configuration.modules) {
        for (var i = 0; i < Configuration.modules.length; i++) {
          if (Configuration.modules[i].name === name) {
            path = Configuration.modules[i].path;
            if (Module.__hasRequire()) {
              var dir = require('path').dirname(process.mainModule.filename);
              if (path.substring(0, 2) === './') {  
                path = dir + path.substring(1, path.length);
              } else if (path.substring(0, 3) === '../') {
                path = dir + '/' + path;
              }
            }
            break;
          }
        }
      }
      return path;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method __hasRequire
   * @returns {Boolean}
   */
  __hasRequire: {
    value: function () {
      return typeof require !== 'undefined';
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});
Object.seal(Module);
Object.seal(Module.prototype);

Module.__loadMainModule();

global.$module = Module.create;

exports.Module = Module;
