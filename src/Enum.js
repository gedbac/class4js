var Enum = Object.create(Object.prototype, {

  create: {
    value: function (fields) {
      var obj = Object.create(Object.prototype);
      TypeBuilder.forEach(fields, function (name, value) {
        Enum.__addField(obj, name, value);
      });
      TypeBuilder.addMethod(obj, 'toString', function () {
        return '[object Enum]';
      });
      Object.freeze(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Enum]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  __isValidName: {
    value: function (name) {
      return new RegExp('^([A-Z]|[0-9]|_)*$', 'g').test(name);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

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