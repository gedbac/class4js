/**
 * @static
 * @class {class4js.ObjectFactory}
 */
var ObjectFactory = Object.create(Object.prototype, {

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
        if (properties && properties instanceof type) {
          return properties;
        } else {
          var object = new type();
          if (properties) {
            ObjectFactory.initialize(object, properties);
          }
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
  },

  /**
   * @memberOf {class4js.ObjectFactory}
   * @static
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

}); 

Object.seal(ObjectFactory);

global.$create = ObjectFactory.create;
global.$init = ObjectFactory.initialize;

exports.ObjectFactory = ObjectFactory;
