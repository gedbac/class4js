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
   * @param {Object} properties
   */
  initialize: {
    value: function (target, properties) {
      if (target && properties) {
        var names = Object.keys(properties); 
        for (var i = 0; i < names.length; i++) {
          target[names[i]] = properties[names[i]];
        }
      }
    }
  }

}); 

class4js.ObjectFactory = ObjectFactory;

global.$create = class4js.ObjectFactory.create;
global.$init = class4js.ObjectFactory.initialize;

