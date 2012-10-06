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
          var instance = new type();
          if (properties) {
            var names = Object.keys(properties); 
            for (var i = 0; i < names.length; i++) {
              instance[names[i]] = properties[names[i]];
            }
          }
          return instance;
        }
      } else {
        throw new TypeException("Type is not set.");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

}); 

class4js.ObjectFactory = ObjectFactory;

global.$create = class4js.ObjectFactory.create;

