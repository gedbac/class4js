/**
 * @class {class4js.Module}
 */
var Module = function () {
  
}

var Module = Object.create(null, {

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @field {ModuleConfiguration[]} __configuration
   */
  __configuration: {
    value: [],
    writable: true,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Module}
   * @static
   * @private
   * @field {ModuleHandler[]} __modules
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
   * @public
   * @method create
   * @param {Function} arguments
   * @param {Function} scope
   * @param {Array} args
   * @returns {Object}
   */
  create: {
    value: function (name, callback, dependencies) {
      if (arguments.length == 1) {
        callback = name;
        name = null;
      } else if (arguments.length == 2 && typeof name === "function") {
        dependencies = callback;
        callback = name;
        name = null;
      }
      if (name && (typeof name !== "string" || !Module.isValidModuleName(name))) {
        throw new TypeException("Module's name is invalid: '" + name + "'");
      }
      var instance = {};
      if (name) {
        var handler = Module.__find(name);
        if (handler) {
          if (!handler.isLoaded) {
            instance = handler.value;
          } else {
            throw new TypeException("Module with name '" + name + "' already defined"); 
          } 
        } else {
          handler = new ModuleHandler(name, instance);
          Module.__modules.push(handler);
        }
      }
      if (dependencies) {
        if (dependencies instanceof Array) {
          var flag = true;
          for (var i = 0; i < dependencies.length; i++) {
            if (typeof dependencies[i] === "string") {
              flag = false
              Module.load(dependencies[i], function () {
                for (var j = 0; j < dependencies.length; j++) {
                  if (typeof dependencies[j] === "string") {
                    if (Module.isLoaded(dependencies[j])) {
                      if (j == dependencies.length - 1) {
                        Module.__onCreate(name, callback, dependencies, instance);
                      }
                    } else {
                      break;
                    }
                  }
                };
              });
            }
          }
          if (flag) {
            Module.__onCreate(name, callback, dependencies, instance);
          }
        } else {
          throw new TypeException("Type of parameter 'dependencies' is invalid");
        }
      } else {
        Module.__onCreate(name, callback, dependencies, instance); 
      }
      return instance;
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
      if (name && typeof name === "string") {
        var handler = Module.__find(name);
        if (handler) {
          return handler.isLoaded;
        }
      } else {
        throw new TypeException("Type of parameter 'name' is invalid");
      }
      return false;
    },
    writable: true,
    enumerable: true,
    configurable: falseG
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
        if (typeof name !== "string" || !Module.isValidModuleName(name)) {
          throw new TypeException("Module's name is invalid: '" + name + "'");
        }
        var handler = Module.__find(name);
        if (handler && handler.isLoaded) {
          callback.call(null, handler.value);
        } else {
          if (handler) {
            handler.onLoaded(callback);
          } else {
            handler = new ModuleHandler(name, {}, callback);
            Module.__modules.push(handler);
            Module.__loadScript(name);
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
   * @method configure
   * @param {ModuleConfiguration[]} configuration
   */
  configure: {
    value: function (configuration) {
      if (configuration) {
        for (var i = 0; i < configuration.length; i++) {
          Module.__configuration.push(ObjectFactory.create(ModuleConfiguration, 
            configuration[i]));
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
   * @method __find
   * @param {String} name
   * @returns {Object}
   */
  __find: {
    value: function (name) {
      if (name && typeof name === "string") {
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
   * @param {String} name
   */
  __loadScript: {
    value: function (name) {
      if (!Module.__hasRequire()) {
        var path = Module.__getModulePath(name);
        var script = document.createElement("script");
        script.async = true;
        script.src = path; 
        script.setAttribute("data-module-name", name);
        script.addEventListener("error", function (e) {
          throw new TypeException("Failed to load module '" + 
            e.target.getAttribute('data-module-name') + "'");
        });
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
      } else {
        require(Module.__getModulePath(name)); 
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
   * @method __onCreate
   * @param {String} name
   * @param {Function} callback
   * @param {Array} dependencies
   * @param {Object} instance
   */
  __onCreate: { 
    value: function (name, callback, dependencies, instance) {
      if (callback) {
        var args = [];
        if (dependencies) {
          for (var i = 0; i < dependencies.length; i++) {
            if (typeof dependencies[i] === "string") {
              args.push(Module.__find(dependencies[i]).value);
            } else {
              args.push(dependencies[i]); 
            }
          }  
        }
        args.push(instance);
        callback.apply(instance, args); 
        Object.seal(instance);
        if (name) { 
          Module.__find(name).fireLoaded();
        }
      } else {
        throw new TypeException("Callback is not set"); 
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
   * @method __getDefaultModulePath
   * @param {String} name
   * @returns {String}
   */
  __getDefaultModulePath: {
    value: function (name) {
      var path;
      if (!Module.__hasRequire()) {
        path = "./scripts/" + name + ".js";
      } else {
        path = name;
      }
      if (Module.__configuration) {
        for (var i = 0; i < Module.__configuration.length; i++) {
          if (Module.__configuration[i].name == "*") {
            if (!Module.__hasRequire()) {
              path = Module.__configuration[i].path + name + ".js";
            } else {
              path = Module.__configuration[i].path + name + ".js";
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
   * @method __getModulePath
   * @param {String} name
   * @returns {String}
   */
  __getModulePath: {
    value: function (name) {
      var path = Module.__getDefaultModulePath(name);
      if (Module.__configuration) {
        for (var i = 0; i < Module.__configuration.length; i++) {
          if (Module.__configuration[i].name == name) {
            path = Module.__configuration[i].path;
            break;
          }
        };
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
      return typeof require !== "undefined";
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});
Object.seal(Module);

global.$module = Module.create;

exports.Module = Module;

