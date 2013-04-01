/**
 * @enum {class4js.InvocationType}
 */
var InvocationType = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} CONSTRUCTOR
   */
  CONSTRUCTOR: {
    value: 0,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} METHOD
   */
  METHOD: {
    value: 1,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} PROPERTY_GETTER
   */
  PROPERTY_GETTER: {
    value: 2,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @field {Integer} PROPERTY_SETTER
   */
  PROPERTY_SETTER: {
    value: 3,
    enumerable: true,
    configurable: false,
    writable: false
  },

  /**
   * @memberOf {class4js.InvocationType}
   * @public
   * @methos toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object Enum]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(InvocationType);

exports.InvocationType == InvocationType;
