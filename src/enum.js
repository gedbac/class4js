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

