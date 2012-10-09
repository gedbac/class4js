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
          prototype["__construct__"].apply(this, args);
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
      var properties = Object.keys(target);
      for (var i = 0; i < properties.length; i++) {
        var name = properties[i];
        if (name != "writable" && name != "enumerable" && name != "configurable") {
          if (name in target) {
            if (!(name in source) || typeof target[name] !== typeof source[name]) { 
              throw new TypeException("Implementation of the property '" + property + "' is invalid");
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
   * @method __instanceOf
   * @param {Object} source
   * @param {Object} target
   * @throws {class4js.TypeException}
   */
  __instanceOf: {
    value: function (source, target) {
      if (source && target) {
        for (var property in target) {
          if (!(property in source)) {
            throw new TypeException("Class doesn't implemet property: " + property);
          } else {
            var sourceDescriptor = Object.getOwnPropertyDescriptor(source, property);
            var targetDescriptor = Object.getOwnPropertyDescriptor(target, property);
            Class.__descriptorsAreEqual(property, sourceDescriptor, targetDescriptor);
          }
        }
        return true;
      } else {
        throw new TypeException("Source or target is not set");
      }   
    } 
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
          for (var i = 0; i < Class.__extensions.length; i++) {
            Class.__extensions[i].call(this); 
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
  addExtension: 
  {
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

class4js.Class = Class; 

global.$class = class4js.Class.create;

