'strict mode';

var class4js = (function (global) {

var exports = {};

exports.version = '1.10.0';

if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function (instance) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function () {
      return fn.apply(instance, args.concat(slice.call(arguments)));
    };
  };
}

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

/**
 * @static
 * @class {class4js.Namespace}
 */
var Namespace = Object.create(null, {

  /*
   * @memberOf {class4js.Namespace}
   * @static
   * @public
   * @method create
   * @param {String} name
   */
  create: {
    value: function (name) {
      if (name) {
        var fragments = name.split('.'),
            parent = global;
        for (var i = 0; i < fragments.length; i++) {
          if (!(fragments[i] in parent)) {
            parent[fragments[i]] = {}; 
          }
         parent = parent[fragments[i]]; 
        }
      } else {
        throw new TypeException("Namespace is not set"); 
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});
Object.freeze(Namespace);

global.$namespace = Namespace.create;

exports.Namespace = Namespace;

/**
 * @static
 * @class {class4js.TypeBuilder}
 */
var TypeBuilder = Object.create(null, {

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isPrivate
   * @param {String} name
   * @returns {Boolean}
   */
  isPrivate: {
    value: function (name) {
      return /^__([A-Z]|[a-z]|[0-9])*$/g.test(name); 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isProtected
   * @param {String} name
   * @returns {Boolean}
   */
  isProtected: {
    value: function (name) {
      return /^_([A-Z]|[a-z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isPublic
   * @param {String} name
   * @returns {Boolean}
   */
  isPublic: {
    value: function (name) {
      return !TypeBuilder.isPrivate(name) && !TypeBuilder.isProtected(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isValidTypeName
   * @param {String} name
   * @returns {Boolean}
   */
  isValidTypeName: {
    value: function (name) {
      return /^[A-Z]([A-Z]|[a-z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isValidConstructorName
   * @param {String} name
   * @returns {Boolean}
   */
  isValidConstructorName: {
    value: function (name) {
      return name == '__construct__';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isValidName
   * @param {String} name
   * @returns {Boolean}
   */
  isValidName: {
    value: function (name) {
      return /^(_|__|[a-z])([a-z]|[A-Z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isValidConstantName
   * @param {String} name
   * @returns {Boolean}
   */
  isValidConstantName: {
    value: function (name) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isObjectInitializer
   * @param {Object} param
   * @returns {Boolean}
   */
  isObjectInitializer: {
    value: function (param) {
      if (typeof param === 'object' && Object.getPrototypeOf(param) === Object.prototype) {
        return true;
      }
      return false;
    }
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method addConstructor
   * @param {Object} owner
   * @param {String} name
   * @param {Object} value
   */
  addConstructor: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidConstructorName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: false,
            enumerable: false,
            configurable: false
          });
        } else {
          throw new TypeException("Constructor's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Constructor's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method addField
   * @param {Object} owner
   * @param {String} name
   * @param {Object} value
   */
  addField: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: true,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Field's '" + name + "' name is invalid"); 
        }
      } else {
        throw new TypeException("Field's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method addMethod
   * @param {Object} owner
   * @param {String} name
   * @param {Function} value
   */
  addMethod: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: false,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Method's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Method's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method addProperty
   * @param {Object} owner
   * @param {String} name
   * @param {Function} getter
   * @param {Function} setter
   */
  addProperty: {
    value: function (owner, name, getter, setter) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            get: getter,
            set: setter,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Property's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Property's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method addConstant
   * @param {Object} owner
   * @param {String} name
   * @param {Object} value
   */
  addConstant: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidConstantName(name)) {
          Object.defineProperty(owner, name, {
            get: function () { return value; },
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          }); 
        } else {
          throw new TypeException("Constant's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Constant's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @private
   * @method addStatic
   * @param {Object} owner
   * @param {Object} properties
   */
  addStatic: {
    value: function (owner, properties) {
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(owner, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          TypeBuilder.addMethod(owner, name, value);
        } else if (TypeBuilder.isProperty(value)) {
          TypeBuilder.addProperty(owner, name, value['get'], value['set']);
        } else if (TypeBuilder.isConstant(name)) {
          TypeBuilder.addConstant(owner, name, value);
        } else {
          TypeBuilder.addField(owner, name, value);
        }
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isConstructor
   * @param {String} name
   * @returns {Boolean}
   */
  isConstructor: {
    value: function (name) {
      return name == '__construct__';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isMethod
   * @param {Object} value
   * @returns {Boolean}
   */
  isMethod: {
    value: function (value) {
      return typeof value === 'function'; 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isProperty
   * @param {Object} value
   * @returns {Boolean}
   */
  isProperty: {
    value: function (value) {
      return (value['get'] || value['set']);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isConstant
   * @param {String} name
   * @returns {Boolean}
   */
  isConstant: {
    value: function (name) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @private
   * @method isStatic
   * @param {String} name
   * @returns {Boolean}
   */
  isStatic: {
    value: function (name) {
      return name == '__static__';
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method isField
   * @param {String} name
   * @param {Object} value
   */
  isField: {
    value: function (name, value) {
      return !TypeBuilder.isConstructor(name) && !TypeBuilder.isMethod(value) 
        && !TypeBuilder.isProperty(value) && !TypeBuilder.isConstant(name) 
        && !TypeBuilder.isStatic(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method forEach
   * @param {Object} properties
   * @param {Function} callback
   */
  forEach: {
    value: function (properties, callback) {
      if (properties) {
        if (typeof callback === 'function') {
          var names = Object.keys(properties);
          for (var i = 0; i < names.length; i++) {
            callback(names[i], properties[names[i]]);
          } 
        } else {
          throw new TypeException("Callback is not function");
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeException}
   * @static
   * @public
   * @method getArgumentNames
   * @param {Function} func
   * @returns {Array} 
   */
  getArgumentNames: {
    value: function (func) {
      if (func) {
        var str = func.toString()
          .match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
          .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
          .replace(/\s+/g, '');
        if (str) {
          return str.split(',');
        }
      }
      return [];
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.TypeBuilder}
   * @static
   * @public
   * @method getPropertyDescriptor
   * @param {Object} object
   * @param {String} propertyName
   * @returns {Object}
   */
  getPropertyDescriptor: {
    value: function (object, propertyName) {
      var descriptor = Object.getOwnPropertyDescriptor(object, propertyName); 
      if (!descriptor) {
        return TypeBuilder.getPropertyDescriptor(Object.getPrototypeOf(object), propertyName);
      }
      return descriptor;
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});

Object.seal(TypeBuilder);

exports.TypeBuilder = TypeBuilder;

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

Object.seal(TypeExtension);
Object.seal(TypeExtension.prototype);

/**
 * @static
 * @class {class4js.Class}
 */
var Class = Object.create(null, {

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

/**
 * @static
 * @class {class4js.Interface}
 */
var Interface = Object.create(null, {

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __copyParentMembers
   * @param {Object} target
   * @param {Object} source
   */
  __copyParentMembers: { 
    value: function (target, source) {
      if (source) {
        for (var propertyName in source) {
          var property = Object.getOwnPropertyDescriptor(source, propertyName); 
          if (property['value'] && TypeBuilder.isMethod(property['value'])) {
            TypeBuilder.addMethod(target, propertyName, property.value);
          } else if (TypeBuilder.isProperty(property)) {
            TypeBuilder.addProperty(target, propertyName, property.get, property.set);
          } else {
            throw new TypeException("Member '" + propertyName + "' is invalid");
          }
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method create
   * @param {Object} properties
   * @param {Array} parents
   * @returns {Object}
   */
  create: {
    value: function (properties, parents) {
      var obj = {};
      if (parents) {
        if (parents instanceof Array) {
          for (var i = 0; i < parents.length; i++) {
            Interface.__copyParentMembers(obj, parents[i]); 
          }
        } else {
          Interface.__copyParentMembers(obj, parents);
        } 
      }
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isMethod(value)) {
          TypeBuilder.addMethod(obj, name, value);
        } else if (TypeBuilder.isProperty(value)) {
          TypeBuilder.addProperty(obj, name, value['get'], value['set']);
        } else {
          throw new TypeException("Member '" + name + "' is invalid"); 
        }
      });
      Object.freeze(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Interface}
   * @static
   * @public
   * @method instanceOf
   * @param {Object} source
   * @param {Object} target
   * @returns {Boolean}
   * @throws {class4js.TypeException}
   */
  instanceOf: {
    value: function (source, target) {
      if (source && target) {
        if (typeof target === 'object') {
          for (var propertyName in target) {
            if (!(propertyName in source)) {
              return false;
            }
          }
        } else if (!(source instanceof target)) {            
          return false;
        }
        return true;
      } else {
        throw new TypeException("Source or target is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});
Object.freeze(Interface);

global.$interface = Interface.create;
global.$is = Interface.instanceOf;

exports.Interface = Interface;

/**
 * @static
 * @class {class4js.ObjectFactory}
 */
var ObjectFactory = Object.create(null, {

  /**
   * @memberOf {class4js.ObjectFactory}
   * @static
   * @public
   * @method create
   * @param {Function} type
   * @param {Object} properties
   * @returns {Object}
   */
  create: {
    value: function (type, properties) {
      if (type) {
        if (properties instanceof type) {
          return properties;
        } else {
          var object = new type();
          ObjectFactory.initialize(object, properties);
          return object;
        }
      } else {
        throw new TypeException("Type is not set.");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ObjectFactory}
   * @static
   * @public
   * @method initialize
   * @param {Object} target
   * @param {Object} source
   */
  initialize: {
    value: function (target, source) {
      if (target && source) {
        for (var propertyName in source) {
          if (propertyName in target) {
            target[propertyName] = source[propertyName];
          } else {
            throw new TypeException("Target doesn't contains a property '" + propertyName + "'"); 
          }
        }
      }
    }
  }

}); 

Object.seal(ObjectFactory);

global.$create = ObjectFactory.create;
global.$init = ObjectFactory.initialize;

exports.ObjectFactory = ObjectFactory;

/**
 * @static
 * @class {class4js.Enum}
 */
var Enum = Object.create(null, {

  /**
   * @memberOf {class4js.Enum}
   * @static
   * @public
   * @method create
   * @param {Array} fields
   * @returns {Object}
   */
  create: {
    value: function (fields) {
      var obj = Object.create(Object.prototype);
      TypeBuilder.forEach(fields, function (name, value) {
        Enum.__addField(obj, name, value);
      });
      Object.freeze(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Enum}
   * @static
   * @private
   * @method __isValidName
   * @returns {Boolean} 
   */
  __isValidName: {
    value: function (name) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Enum}
   * @static
   * @private
   * @method __addField
   * @param {Object} owner
   * @param {String} name
   * @param {Object} value
   * @returns {Boolean}
   */
  __addField: {
    value: function (owner, name, value) {
      if (owner) {
        if (Enum.__isValidName(name)) {
          if (typeof value === 'number') {
            Object.defineProperty(owner, name, {
              value: value,
              writable: false,
              enumerable: true,
              configurable: false
            });
          } else {
            throw new TypeException("Field's '" + name + "' value is invalid");
          }
        } else {
          throw new TypeException("Field's '" + name +"' name is invalid"); 
        }
      } else {
        throw new TypeException("Field's '" + name + "' owner can't be null");
      }      
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});
Object.freeze(Enum);

global.$enum = Enum.create;

exports.Enum = Enum;

/**
 * @interface {class4js.IInterceptor}
 */
var IInterceptor = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IInterceptor}
   * @public
   * @method intercept
   * @param {IInvocation} invocation
   */
  intercept: {
    value: function (invocation) { },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;

/**
 * @enum {class4js.InvocationType}
 */
var InvocationType = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} CONSTRUCTOR
   */
  CONSTRUCTOR: {
    value: 0,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} METHOD
   */
  METHOD: {
    value: 1,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} PROPERTY_GETTER
   */
  PROPERTY_GETTER: {
    value: 2,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} PROPERTY_SETTER
   */
  PROPERTY_SETTER: {
    value: 3,
    enumerable: true,
    configurable: false,
    writable: false
  }

});

Object.freeze(InvocationType);

exports.InvocationType == InvocationType;

/**
 * @class {class4js.Invocation}
 * @constructor {class4js.Invocation}
 */
var Invocation = function (name, type, arguments, interceptors) {
  this.__name = name;
  this.__type = type;
  this.__arguments = arguments;
  this.__returnValue = null;
  this.__interceptors = interceptors;
  this.__context = null;
  this.__current = 0;
  Object.seal(this);
};

Invocation.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.Invocation}
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
   * @memberOf {class4js.Invocation}
   * @public
   * @property {InvocationType} type
   */
  type: {
    get: function () {
      return this.__type;
    },
    set: function (value) {
      this.__type = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isConstructor
   */
  isConstructor: {
    get: function () {
      return this.__type == InvocationType.CONSTRUCTOR;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isMethod
   */
  isMethod: {
    get: function () {
      return this.__type == InvocationType.METHOD;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isPropertyGetter
   */
  isPropertyGetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_GETTER;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isPropertySetter
   */
  isPropertySetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_SETTER;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object[]} arguments
   */
  arguments: {
    get: function () {
      return this.__arguments;
    },
    set: function (value) {
      this.__arguments = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object} returnValue
   */
  returnValue: {
    get: function () {
      return this.__returnValue;
    },
    set: function (value) {
      this.__returnValue = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {IInterceptor[]} interceptors
   */
  interceptors: {
    get: function () {
      return this.__interceptors;
    },
    set: function (value) {
      this.__interceptors = value;
    },
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object} context
   */
  context: {
    get: function () {
      return this.__context;
    },
    set: function (value) {
      this.__context = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js,Invocation}
   * @public
   * @method procceed
   * @returns {Object}
   */
  procceed: {
    value: function () {
      if (this.__interceptors.length > this.__current) {
        var interceptor = this.__interceptors[this.__current];
        this.__current++;
        if (typeof interceptor === 'function') {
          this.__returnValue = interceptor.call(null, this);
        } else {
          this.__returnValue = interceptor.intercept.call(null, this);    
        } 
      }
      return this.__returnValue;
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object class4js.Invocation]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Invocation);
Object.seal(Invocation.prototype);

exports.Invocation = Invocation;

/**
 * @interface {class4js.IInterceptor}
 */
var IInterceptor = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.IInterceptor}
   * @public
   * @method intercept
   * @param {IInvocation} invocation
   */
  intercept: {
    value: function (invocation) { },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;

/**
 * @static
 * @class {class4js.Proxy}
 */
var Proxy = Object.create(null, {

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @public
   * @method create
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   * @returns {Object}
   */
  create: {
    value: function (type, interceptors) {
      if (type) {
        if (interceptors) {
          if (typeof interceptors === 'function' || Interface.instanceOf(interceptors, IInterceptor)) {
            interceptors = [ interceptors ];
          } else if (interceptors instanceof Array) {
            for (var interceptor in interceptors) {
              if (typeof interceptor !== 'function' && Interface.instanceOf(interceptor, IInterceptor)) {
                throw new TypeException("Interceptor type is invalid");
              } 
            }
          } else {
            throw new TypeException("Interceptor type is invalid");
          }
        } else {
          throw new TypeException("Interceptor is not set"); 
        }
        if (typeof type === 'function') {
          return Proxy.__createClassProxy(type, interceptors);  
        } else {
          return Proxy.__createInterfaceProxy(type, interceptors); 
        }
      } else {
        throw new TypeException("Type is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __createInterfaceProxy
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   * @returns {Object}
   */
  __createInterfaceProxy: {
    value: function (type, interceptors) {
      var proxy = {};
      for (var propertyName in type) {
        if (TypeBuilder.isPublic(propertyName)) {
          Proxy.__intercept(type.prototype, constructor.prototype, propertyName, 
              interceptors);
        }
      }
      Object.seal(proxy);
      return proxy;
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __createClassProxy
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   */
  __createClassProxy: {
    value: function (type, interceptors) {
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), arguments);
        Object.seal(this);
      };
      constructor.prototype = Object.create(type.prototype);
      Proxy.__intercept(type.prototype, constructor.prototype, '__construct__', 
          interceptors);
      for (var propertyName in type.prototype) {
        if (TypeBuilder.isPublic(propertyName)) {
          Proxy.__intercept(type.prototype, constructor.prototype, propertyName, 
              interceptors);
        }
      } 
      return new constructor();
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __intercept
   * @param {Object} source 
   * @param {Object} target
   * @param {String} propertyName
   * @param {IInterceptor[]} interceptors
   */
  __intercept: {
    value: function (source, target, propertyName, interceptors) {
      var descriptor = TypeBuilder.getPropertyDescriptor(source, propertyName);
      if (descriptor) {
        if (TypeBuilder.isConstructor(propertyName)) {
          Proxy.__interceptConstructor(target, descriptor, interceptors);
        } else if (TypeBuilder.isProperty(descriptor)) {
          Proxy.__intercepProperty(target, propertyName, descriptor['get'], descriptor['set'], interceptors);
        } else if (TypeBuilder.isMethod(descriptor['value'])) {
          Proxy.__interceptMethod(target, propertyName, descriptor, interceptors);
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __interceptConstructor
   * @param {Object} proxy
   * @param {Object} descriptor
   * @param {IInterceptor[]} interceptors 
   */
  __interceptConstructor: {
    value: function (proxy, descriptor, interceptors) {
      var constructor = function () {
        var invocation = new Invocation('__construct__', InvocationType.CONSTRUCTOR, 
          arguments, interceptors);
        return invocation.procceed();
      };
      TypeBuilder.addMethod(constructor, 'toString', function () {
        return descriptor['value'].toString();
      });
      TypeBuilder.addConstructor(proxy, '__construct__', constructor);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __interceptMethod
   * @param {Object} proxy
   * @param {String} propertyName
   * @param {Object} descriptor
   * @param {IInterceptor[]} interceptors
   */
  __interceptMethod: {
    value: function (proxy, propertyName, descriptor, interceptors) {
      var method = function () {
        var invocation = new Invocation(propertyName, InvocationType.METHOD, 
          arguments, interceptors);
        return invocation.procceed();
      };
      TypeBuilder.addMethod(method, 'toString', function () {
        return descriptor['value'].toString();
      });
      TypeBuilder.addMethod(proxy, propertyName, method); 
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __intercepProperty
   * @param {Object} proxy
   * @param {String} propertyName
   * @param {Boolean} readable
   * @param {Object} descriptor
   * @param {IInterceptor[]} interceptors
   */
  __intercepProperty: {
    value: function (proxy, propertyName, descriptor, interceptors) {
      var getter, setter;
      if (descriptor['get']) {
        getter = function () {
          var getterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_GETTER, arguments, interceptors);
          return getterInvocation.procceed();
        };
        TypeBuilder.addMethod(getter, 'toString', function () {
          return descriptor['get'].toString();
        });
      } 
      if (descriptor['set']) {
        setter = function () {
          var setterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_SETTER, arguments, interceptors);
          setterInvocation.procceed();
        };
        TypeBuilder.addMethod(setter, 'toString', function () {
          return descriptor['set'].toString();
        });
      }
      TypeBuilder.addProperty(proxy, propertyName, getter, setter);
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});
Object.freeze(Proxy);

global.$proxy = Proxy.create;

exports.Proxy = Proxy;

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

Object.seal(ModuleException);
Object.seal(ModuleException.prototype);

exports.ModuleException = ModuleException;

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
      return '[object class4js.ModuleConfiguration]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleConfiguration);
Object.seal(ModuleConfiguration.prototype);

exports.ModuleConfiguration = ModuleConfiguration;

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
return exports;

}(typeof global !== 'undefined' ? global : window));

if (typeof module !== 'undefined' && module !== null) {
  module.exports.class4js = class4js;
}
