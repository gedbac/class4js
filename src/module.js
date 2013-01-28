/**
 * @static
 * @class {class4js.Module}
 */
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
          for (var i = 0; i < dependencies.length; i++) {
            if (typeof dependencies[i] === "string") {
              Module.load(dependencies[i], function (module) {
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
        
      }
      Module.__configuration = configuration;
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
      var url = "./scripts/" + name + ".js";
      var script = document.createElement("script");
      script.async = true;
      script.src = url; 
      script.setAttribute("data-module-name", name);
      script.addEventListener("error", function (e) {
        throw new TypeException("Failed to load module '" + e.target.getAttribute('data-module-name') + "'");
      });
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
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
  }

});
Object.freeze(Module);

global.$module = Module.create;

exports.Module = Module;

