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
        Class.extend(this);
        if (parent) {
          Class.__initialize.call(this, parent.prototype, arguments);
        }
        Class.__initialize.call(this, Object.getPrototypeOf(this), arguments);
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
      var obj = {};
      TypeBuilder.addStatic(obj, properties);
      Class.__initialize.call(obj, obj);
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
   * @private
   * @method __initialize
   * @param {Object} prototype
   * @param {Array} args
   */
  __initialize: {
    value: function (prototype, args) {
      if (prototype && prototype.hasOwnProperty('__construct__')) {
        if (typeof prototype['__construct__'] === 'function') {
          if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
            prototype['__construct__'].apply(this);
            ObjectFactory.initialize(this, args[0]);
          } else {
            prototype['__construct__'].apply(this, args);
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
      for (var propertyName in target) {
        if (propertyName != 'writable' && propertyName != 'enumerable' 
            && propertyName != 'configurable') {
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
   * @method extend
   * @param {Object} instance
   */
  extend: {
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
        Object.defineProperty(constructor.prototype, '_super', {
          get: function () {
            var prototype = Object.getPrototypeOf(this);
            return Object.getPrototypeOf(prototype);
          },
          enumerable: false,
          configurable: false
        });
      } else {
        constructor.prototype = Object.create(Object.prototype);
      }
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(constructor.prototype, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          TypeBuilder.addMethod(constructor.prototype, name, value);
        } else if (TypeBuilder.isProperty(value)) {
          TypeBuilder.addProperty(constructor.prototype, name, value['get'], 
            value['set']);
        } else if (TypeBuilder.isConstant(name)) { 
          TypeBuilder.addConstant(constructor, name, value); 
        } else if (TypeBuilder.isStatic(name)) {
          TypeBuilder.addStatic(constructor, value); 
        } else {
          TypeBuilder.addField(constructor.prototype, name, value);
        }
      });
      Class.__initialize.call(constructor, constructor);
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
  }

});
Object.freeze(Class);

global.$class = Class.create;
global.$abstract_class = Class.createAbstract;
global.$static_class = Class.createStatic;
global.$extend = Class.addExtension;

exports.Class = Class;
