"use strict";

/**
 * @static
 * @class {Class}
 */
var Class = Object.create(null, {

  /**
   * @memberOf {Class}
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
   * @memberOf {Class}
   * @static
   * @private
   * @method __isPublic
   * @param {String} name
   * @returns {Boolean}
   */
  __isPublic: {
    value: function (name) {
      return name[name.length - 1] != '_';
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __isFunction
   * @param {String} name
   * @param {Object} value
   * @returns {Boolean}
   */
  __isFunction: {
    value: function (name, value) {
      return typeof value === "function";
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __isProperty
   * @param {String} name
   * @param {Object} value
   * @returns {Boolean}
   */
  __isProperty: {
    value: function (name, value) {
      return (value["get"] != null || value["set"] != null);
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __isConstant
   * @param {String} name
   * @param {Object} value
   * @returns {Boolean}
   */
  __isConstant: {
    value: function (name, value) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __isStatic
   * @param {String} name
   * @param {Object} value
   * @returns {Boolean}
   */
  __isStatic: {
    value: function (name, value) {
      return name == "__static__";
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __addMethod
   * @param {Object} owner
   * @param {String} name
   * @param {Function} value
   */
  __addMethod: {
    value: function (owner, name, value) {
      Object.defineProperty(owner, name, {
        value: value,
        writable: false,
        enumerable: Class.__isPublic(name),
        configurable: false
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __addProperty
   * @param {Object} owner
   * @param {String} name
   * @param {Function} getter
   * @param {Function} setter
   */
  __addProperty: {
    value: function (owner, name, getter, setter) {
      Object.defineProperty(owner, name, {
        get: getter,
        set: setter,
        enumerable: Class.__isPublic(name),
        configurable: false
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __addField
   * @param {Object} owner
   * @param {String} name
   * @param {Objetc} value
   */
  __addField: {
    value: function (owner, name, value) {
      Object.defineProperty(owner, name, {
        value: value,
        writable: false,
        enumerable: Class.__isPublic(name),
        configurable: false
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __addConstant
   * @param {Object} owner
   * @param {String} name
   * @param {Objetc} value
   */
  __addConstant: {
    value: function (owner, name, value) {
      Object.defineProperty(owner, name, {
        get: function () { return value; },
        enumerable: Class.__isPublic(name),
        configurable: false
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @private
   * @method __addStaticProperties
   * @param {Object} owner
   * @param {Object} properties
   */
  __addStaticProperties: {
    value: function (owner, properties) {
      if (properties) {
        var names = Object.keys(properties);
        for (var i = 0; i < names.length; i++) {
          var name = names[i],
              value = properties[names[i]];
          if (Class.__isFunction(name, value)) {
            Class.__addMethod(owner, name, value);
          } else if (Class.__isProperty(name, value)) {
            Class.__addProperty(name, value["get"], value["set"]);
          } else if (Class.__isConstant(name, value)) {
            Class.__addConstant(owner, name, value); 
          } else {
            Class.__addField(owner, name, value);
          }
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {Class}
   * @static
   * @public
   * @method create
   * @param {Object} properties
   * @param {Object} parent
   * @returns {Object}
   */
  create: {
    value: function (properties, parent) {
      var constructor = function () {
        Class.__initialize.call(this, Object.getPrototypeOf(this), arguments);
        if (parent) {
          Class.__initialize.call(this, parent.prototype, arguments);
        }
        Object.seal(this);
      }
      if (parent) {
        constructor.prototype = Object.create(parent.prototype);
        Object.defineProperty(constructor.prototype, "_super", {
          get: function () {
            var prototype = Object.getPrototypeOf(this);
            return Object.getPrototypeOf(prototype);
          },
          enumerable: true,
          configurable: false
        });
      } else {
        constructor.prototype = Object.create(Object.prototype);
      }
      if (properties) {
        var names = Object.keys(properties);
        for (var i = 0; i < names.length; i++) {
          var name = names[i],
              value = properties[names[i]];
          if (Class.__isFunction(name, value)) {
            Class.__addMethod(constructor.prototype, name, value);
          } else if (Class.__isProperty(name, value)) { 
            Class.__addProperty(constructor.prototype, name, value["get"],
              value["set"]);
          } else if (Class.__isConstant(name, value)) {
            Class.__addConstant(constructor, name, value);
          } else if (Class.__isStatic(name, value)) {
            Class.__addStaticProperties(constructor, value);
          } else {
            Class.__addField(constructor.prototype, name, value);
          }
        }
      }
      Object.seal(constructor);
      Object.seal(constructor.prototype);
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }
});
Object.freeze(Class);

module.exports = Class;
global.$class = global.$class || Class.create;
