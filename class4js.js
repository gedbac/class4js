var class4js = (function (global) {

"use strict";

var exports = {};
/**
 * @class {class4js.TypeException}
 * @constructor {class4js.TypeException}
 * @param {String} message
 */
var TypeException = function (message) {
  this.__name = "TypeException";
  this.__message = message;
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
          throw new TypeException("Field's name is invalid: '" + name + "'"); 
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
 * @static
 * @class {class4js.Class}
 */
var Class = Object.create(null, {

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @field {Array} __extensions
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
   * @method __isStatic
   * @param {String} name
   * @returns {Boolean}
   */
  __isStatic: {
    value: function (name) {
      return name == "__static__";
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Class}
   * @static
   * @private
   * @method __addStatic
   * @param {Object} owner
   * @param {Object} properties
   */
  __addStatic: {
    value: function (owner, properties) {
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isMethod(value)) {
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
   * @public
   * @method create
   * @param {Object} properties
   * @param {Object} parent
   * @param {Array} interfaces
   * @returns {Object}
   */
  create: {
    value: function (properties, parent, interfaces) {
      var constructor = function () {
        if (Class.__extensions && Class.__extensions.length > 0) {
          for (var j = 0; j < Class.__extensions.length; j++) {
            Class.__extensions[j].call(this); 
          }
        }
        if (parent) {
          Class.__initialize.call(this, parent.prototype, arguments);
        }
        Class.__initialize.call(this, Object.getPrototypeOf(this), arguments);
        Object.seal(this);
      }
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
        } else if (Class.__isStatic(name)) {
          Class.__addStatic(constructor, value); 
        } else {
          TypeBuilder.addField(constructor.prototype, name, value);
        }
      });
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
   * @method addExtension
   * @param {Function} extension
   */
  addExtension: {
    value: function (extension) {
      if (extension) {
        Class.__extensions.push(extension);
      } 
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});
Object.freeze(Class);

global.$class = Class.create;

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
 * @class {class4js.Module}
 */
var Module = Object.create(null, {

  /**
   * @memberOf {class4js.Module}
   * @static
   * @public
   * @method create
   * @param {Function} scope
   * @returns {Object}
   */
  create: {
    value: function (scope) {
      var module = {};
      if (scope) {
        scope(module);
      }
      return module;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }
      
});
Object.freeze(Module);

global.$module = Module.create;

exports.Module = Module;

return exports;

}(window));
