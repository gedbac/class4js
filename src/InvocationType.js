var InvocationType = Object.create(Object.prototype, {

  CONSTRUCTOR: {
    value: 0,
    enumerable: true,
    configurable: false,
    writable: false
  },

  METHOD: {
    value: 1,
    enumerable: true,
    configurable: false,
    writable: false
  },

  PROPERTY_GETTER: {
    value: 2,
    enumerable: true,
    configurable: false,
    writable: false
  },

  PROPERTY_SETTER: {
    value: 3,
    enumerable: true,
    configurable: false,
    writable: false
  },

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