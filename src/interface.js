/**
 * @static
 * @class {class4js.Interface}
 */
var Interface = Object.create(null, {
 
  /**
   * @memberOf {class4js.Class}
   * @static
   * @public
   * @method create
   * @param {Object} properties
   * @param {Object} parent
   * @returns {Object}
   */
  create: {
    value: function (properties, parent) {
      var obj;
      if (parent) {
        obj = Object.create(parent);
      } else {
        obj = Object.create(Object);
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
        for (var property in target) {
          if (!(property in source)) {
            return false;
          }
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

class4js.Interface = Interface;

global.$interface = class4js.Interface.create;
global.$is = class4js.Interface.instanceOf;
