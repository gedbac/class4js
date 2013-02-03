"use strict";

exports.version = "1.9.0";

/**
 * @class {class4js.TypeException}
 * @constructor {class4js.TypeException}
 * @param {String} message
 */
var TypeException = function (message) {
  this.__name = "TypeException";
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
   * @memberOf {clas4js.TypeException}
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
      return this.name + ": " + this.message;
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
        var fragments = name.split("."),
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
      return name == "__construct__";
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
      if (typeof param === "object" && Object.getPrototypeOf(param) === Object.prototype) {
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
          TypeBuilder.addProperty(owner, name, value["get"], value["set"]);
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
      return name == "__construct__";
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
      return typeof value === "function"; 
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
      return (value["get"] != null || value["set"] != null);
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
      return name == "__static__";
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
   * @memberOf {class4js.TypeException}
   * @static
   * @public
   * @method forEach
   * @param {Object} properties
   * @param {Function} callback
   */
  forEach: {
    value: function (properties, callback) {
      if (properties) {
        if (typeof callback === "function") {
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
    return "class4js.TypeExtension";
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
      var constructor = function () {
        Class.__extend(this);
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
      if (prototype && prototype.hasOwnProperty("__construct__")) {
        if (typeof prototype["__construct__"] === "function") {
          if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
            prototype["__construct__"].apply(this);
            ObjectFactory.initialize(this, args[0]);
          } else {
            prototype["__construct__"].apply(this, args);
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
        if (propertyName != "writable" && propertyName != "enumerable" 
            && propertyName != "configurable") {
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
   * @method __getPropertyDescriptor
   * @param {Object} object
   * @param {String} propertyName
   * @returns {Objecy}
   */
  __getPropertyDescriptor: {
    value: function (object, propertyName) {
      var descriptor = Object.getOwnPropertyDescriptor(object, propertyName); 
      if (!descriptor) {
        return Class.__getPropertyDescriptor(Object.getPrototypeOf(object), propertyName);
      }
      return descriptor;
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
            var sourceDescriptor = Class.__getPropertyDescriptor(source, propertyName);
            var targetDescriptor = Class.__getPropertyDescriptor(target, propertyName);
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
   * @method __extend
   * @param {Object} instance
   */
  __extend: {
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
        Object.defineProperty(constructor.prototype, "_super", {
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
          TypeBuilder.addProperty(constructor.prototype, name, value["get"], 
            value["set"]);
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
          if (property["value"] && TypeBuilder.isMethod(property["value"])) {
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
          TypeBuilder.addProperty(obj, name, value["get"], value["set"]);
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
        if (typeof target === "object") {
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
      var obj = {};
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
      return /^([a-z])([a-z]|[A-Z]|[0-9])*$/g.test(name);
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
          if (typeof value === "number") {
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
 * @internal
 * @class {class4js.ModuleHandler}
 * @constructor {class4js.ModuleHandler}
 * @param {String} name
 * @param {Object} value
 * @param {Function} callback
 */
var ModuleHandler = function (name, value, callback) {
  this.__loaded = false;
  this.__name = name;
  this.__value = value;
  this.__listeners = [];
  if (callback) {
    this.onLoaded(callback);
  }
  Object.seal(this); 
};

ModuleHandler.prototype = Object.create(Object.prototype, {

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @property {String} isLoaded
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
   * @memebtOf {class4js.ModuleHandler}
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
   * @memebtOf {class4js.ModuleHandler{
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
   * @memberOf {class4js.ModuleHandler}
   * @public
   * @method onLoaded
   * @param {Function} callback
   */
  onLoaded: {
    value: function (callback) {
      if (callback && typeof callback === "function") {
        this.__listeners.push(callback);
      } else {
        throw new TypeException("Callback is not set or it's type invalid");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @method fireLoaded
   */
  fireLoaded: {
    value: function () {
      this.__loaded = true;
      for (var i = 0; i < this.__listeners.length; i++) {
        this.__listeners[i].call(this, this.value);
      };
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return "class4js.ModuleHandler";
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleHandler);
Object.seal(ModuleHandler.prototype);

/**
 * @internal
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
      return "class4js.ModuleConfiguration";
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

