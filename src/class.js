/**
 * @static
 * @class {class4js.Class}
 */
var Class = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @field {TypeExtension[]} __extensions
   */
  __extensions: {
    value: [],
    writable: true,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method create
   * @param {Object} properties
   * @param {Object} parent
   * @param {Array} interfaces
   * @returns {Function}
   */
  create: {
    value: function (properties, parent, interfaces) {
      if (arguments.length === 2) {
        if (typeof parent === 'object' || parent instanceof Array) {
          interfaces = parent;
          parent = null;
        }  
      }
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), arguments);
        Object.seal(this);
      };
      Class.__onCreateClass(constructor, properties, parent, interfaces);
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method createAbstract
   * @param {Object} properties
   * @param {Object} parent
   * @param {Array} interfaces
   * @returns {Function}
   */
  createAbstract: {
    value: function (properties, parent, interfaces) {
      if (arguments.length === 2) {
        if (typeof parent === 'object' || parent instanceof Array) {
          interfaces = parent;
          parent = null;
        }  
      }
      var constructor = function () {
        throw new TypeException("Abstract class can't be instantiated");
      };
      Class.__onCreateClass(constructor, properties, parent, interfaces);
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method createStatic
   * @param {Object} properties
   * @returns {Object}
   */
  createStatic: {
    value: function (properties) {
      var obj = Object.create(Object.prototype);
      TypeBuilder.addStatic(obj, properties);
      TypeBuilder.addMethod(obj, 'toString', function () {
        return '[object Class]';
      });
      Class.initialize(obj, obj);
      Object.seal(obj);
      return obj; 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method addExtension
   * @param {Object} target
   * @param {String} name
   * @param {Function} value
   */
  addExtension: {
    value: function (target, name, value) {
      if (!target) {
        throw new TypeException("Target is not set");
      } 
      if (!name) {
        throw new TypeException("Method name is not set");
      }
      if (!TypeBuilder.isPublic(name)) {
        throw new TypeException("Only public methods can be added");
      }
      if (!value || !TypeBuilder.isMethod(value)) {
        throw new TypeException("Method is not set");
      }
      if (!TypeBuilder.isMethod(value)) {
        throw new TypeException("Method is invalid");
      }
      Class.__extensions.push(new TypeExtension(target, name, value));
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method initialize
   * @param {Object} instance
   * @param {Object} prototype
   * @param {Array} args
   */
  initialize: {
    value: function (instance, prototype, args) {
      if (prototype) {
        var parent = Object.getPrototypeOf(prototype);
        if (parent && parent !== Object.prototype) {
          Class.initialize(instance, parent, args);
        }
      }
      if (prototype && prototype.hasOwnProperty('__construct__')) {
        if (typeof prototype['__construct__'] === 'function') {
          if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
            prototype['__construct__'].apply(instance);
            ObjectFactory.initialize(instance, args[0]);
          } else {
            prototype['__construct__'].apply(instance, args);
          }
        } else {
          throw new TypeException("Class member's '__construct__' type is invalid");
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method includeExtensions
   * @param {Object} instance
   */
  includeExtensions: {
    value: function (instance) {
      if (Class.__extensions && Class.__extensions.length > 0) {
        for (var i = 0; i < Class.__extensions.length; i++) {
          var extension = Class.__extensions[i];
          if (Interface.instanceOf(instance, extension.target)) {
            if (!(extension.name in instance)) {
              TypeBuilder.addMethod(instance, extension.name, extension.value); 
            }
          }
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object class4js.Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @methods __descriptorsAreEqual
   * @param {String} property
   * @param {Object} source
   * @param {Object} target
   */
  __descriptorsAreEqual: { 
    value: function (property, source, target) {
      var sourceArguments, targetArguments;
      for (var propertyName in target) {
        if (propertyName != 'writable' && propertyName != 'enumerable' && propertyName != 'configurable') {
          if (!(propertyName in source) || typeof target[propertyName] !== typeof source[propertyName]) {
            throw new TypeException("Implementation of the property '" + propertyName + "' is invalid");
          }
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __instanceOf
   * @param {Object} source
   * @param {Object} target
   * @throws {class4js.TypeException}
   */
  __instanceOf: {
    value: function (source, target) {
      if (source && target) {
        for (var propertyName in target) {
          if (!(propertyName in source)) {
            throw new TypeException("Class doesn't implemet property: " + propertyName);
          } else {
            var sourceDescriptor = TypeBuilder.getPropertyDescriptor(source, propertyName);
            var targetDescriptor = TypeBuilder.getPropertyDescriptor(target, propertyName);
            Class.__descriptorsAreEqual(propertyName, sourceDescriptor, targetDescriptor);
          }
        }
        return true;
      } else {
        throw new TypeException("Source or target is not set");
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __onCreateClass
   * @param {Function} constructor
   * @param {Object} properties
   * @param {Object} parent
   * @param {Array} interfaces
   */
  __onCreateClass: {
    value: function (constructor, properties, parent, interfaces) {
      if (parent) {
        constructor.prototype = Object.create(parent.prototype);
      } else {
        constructor.prototype = Object.create(Object.prototype);
        TypeBuilder.addMethod(constructor.prototype, 'toString', function () {
          return '[object Class]';
        });
      }
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(constructor.prototype, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          if (parent && Class.__hasSuper(value)) {
            var method = function () {
              var args = [ Class.__wrap(this, parent.prototype) ];
              if (arguments) {
                for (var i = 0; i < arguments.length; i++) {
                  args.push(arguments[i]);
                }
              }
              return value.apply(this, args);
            };
            TypeBuilder.addMethod(method, 'toString', function () {
              return value.toString();
            });
            TypeBuilder.addMethod(constructor.prototype, name, method);
          } else {
            TypeBuilder.addMethod(constructor.prototype, name, value);
          }
        } else if (TypeBuilder.isProperty(value)) {
          var getter = value['get'];
          if (getter && parent && Class.__hasSuper(getter)) {
            getter = function () {
              return value['get'].call(this, Class.__wrap(this, parent.prototype));
            };
            TypeBuilder.addMethod(getter, 'toString', function () {
              return value['get'].toString();
            });
          }
          var setter = value['set'];
          if (setter && parent && Class.__hasSuper(setter)) {
            setter = function () {
              var args = [ Class.__wrap(this, parent.prototype) ];
              if (arguments && arguments.length > 0) {
                args.push(arguments[0]);
              }
              value['set'].apply(this, args);
            };
            TypeBuilder.addMethod(setter, 'toString', function () {
              return value['set'].toString();
            });
          }
          TypeBuilder.addProperty(constructor.prototype, name, getter, setter);
        } else if (TypeBuilder.isConstant(name)) { 
          TypeBuilder.addConstant(constructor, name, value); 
        } else if (TypeBuilder.isStatic(name)) {
          TypeBuilder.addStatic(constructor, value); 
        } else {
          TypeBuilder.addField(constructor.prototype, name, value);
        }
      });
      Class.initialize(constructor, constructor);
      Object.seal(constructor);
      Object.seal(constructor.prototype);
      if (interfaces) {
        if (interfaces instanceof Array) {
          for (var i = 0; i < interfaces.length; i++) {
            Class.__instanceOf(constructor.prototype, interfaces[i]);
          }
        } else {
          Class.__instanceOf(constructor.prototype, interfaces);
        } 
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __hasSuper
   * @param {Function} func
   * @returns {Boolean}
   */
  __hasSuper: {
    value: function (func) {
      var names = TypeBuilder.getArgumentNames(func);
      if (names.length > 0 && names[0] === '$super') {
        return true;
      }
      return false;  
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __wrap
   * @param {Object} instance
   * @param {Object} prototype
   * @returns {Object}
   */
  __wrap: {
    value: function (instance, prototype) {
      if ('__wrappers__' in instance && instance.__wrappers__) {
        for (var i = 0; i < instance.__wrappers__.length; i++) {
			    if (instance.__wrappers__[i].proto === proto) {
				    return instance.__wrappers__[i].wrapper;
			    }	
		    }
      }
      var wrapper = Object.create(Object.prototype);
      Class.__buildWrapper(instance, wrapper, prototype);
      Object.seal(wrapper);
      if ('__wrappers__' in instance) {
		    if (!this.__wrappers__) {
			    this.__wrappers__ = [];
		    }
		    this.__wrappers__.push({ proto: proto, wrapper: wrapper });
	    }
      return wrapper;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __buildWrapper
   * @param {Object} instance
   * @param {Object} wrapper
   * @param {Object} prototype
   * @returns {Object}
   */
  __buildWrapper: {
    value: function (instance, wrapper, prototype) {
      if (prototype && prototype !== Object.prototype) {
        var descriptor;
        var properties = Object.getOwnPropertyNames(prototype);
        for (var i = 0; i < properties.length; i++) {  
          if (properties[i] !== '__construct__' && !(properties[i] in wrapper)) {
            descriptor = Object.getOwnPropertyDescriptor(prototype, properties[i]);
            if (descriptor.value) {
              Object.defineProperty(wrapper, properties[i], {
                value: descriptor.value.bind(instance),
                writable: descriptor.writable,
                enumerable: descriptor.enumerable,
                configurable: descriptor.configurable
              });
            } else {
              Object.defineProperty(wrapper, properties[i], {
                get: descriptor.get ? descriptor.get.bind(instance) : undefined,
                set: descriptor.set ? descriptor.set.bind(instance) : undefined,
                enumerable: descriptor.enumerable,
                configurable: descriptor.configurable
              });
            }
          }
        }
        Class.__buildWrapper(instance, wrapper, Object.getPrototypeOf(prototype));
      }   
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});
Object.freeze(Class);

global.$class = Class.create;
global.$abstract_class = Class.createAbstract;
global.$static_class = Class.createStatic;
global.$extend = Class.addExtension;

exports.Class = Class;
