var Interface = Object.create(Object.prototype, {

  create: {
    value: function (properties, parents) {
      var obj = Object.create(Object.prototype);
      if (parents) {
        if (parents instanceof Array) {
          for (var i = 0; i < parents.length; i++) {
            Interface.__copyParentMembers(obj, parents[i]);
          }
        } else {
          Interface.__copyParentMembers(obj, parents);
        }
      }
      TypeBuilder.forEach(properties, function (name, value) {
        if (!obj.hasOwnProperty(name)) {
          if (TypeBuilder.isMethod(value)) {
            TypeBuilder.addMethod(obj, name, value);
          } else if (TypeBuilder.isProperty(value)) {
            TypeBuilder.addProperty(obj, name, value.get, value.set);
          } else {
            throw new TypeException("Member '" + name + "' is invalid");
          }
        }
      });
      if (!obj.hasOwnProperty('toString')) {
        TypeBuilder.addMethod(obj, 'toString', function () {
          return '[object Interface]';
        });
      }
      Object.freeze(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Interface]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  __copyParentMembers: {
    value: function (target, source) {
      if (source) {
        for (var propertyName in source) {
          if (!target.hasOwnProperty(propertyName)) {
            var property = Object.getOwnPropertyDescriptor(source, propertyName);
            if (property.value && TypeBuilder.isMethod(property.value)) {
              TypeBuilder.addMethod(target, propertyName, property.value);
            } else if (TypeBuilder.isProperty(property)) {
              TypeBuilder.addProperty(target, propertyName, property.get, property.set);
            } else {
              throw new TypeException("Member '" + propertyName + "' is invalid");
            }
          }
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(Interface);

global.$interface = Interface.create;

exports.Interface = Interface;