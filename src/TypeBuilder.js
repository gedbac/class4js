var TypeBuilder = Object.create(Object.prototype, {

  isPrivate: {
    value: function (name) {
      return /^__([A-Z]|[a-z]|[0-9])*$/g.test(name); 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isProtected: {
    value: function (name) {
      return /^_([A-Z]|[a-z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isPublic: {
    value: function (name) {
      return !TypeBuilder.isPrivate(name) && !TypeBuilder.isProtected(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidTypeName: {
    value: function (name) {
      return /^[A-Z]([A-Z]|[a-z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidConstructorName: {
    value: function (name) {
      return name == '__construct__';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidName: {
    value: function (name) {
      return /^(_|__|[a-z])([a-z]|[A-Z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidConstantName: {
    value: function (name) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  isValidEventName: {
    value: function (name) {
      return /^([a-z])([a-z]|[A-Z]|[0-9])*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidSystemFieldName: {
    value: function (name) {
      return /^__([a-z]|[A-Z]|[0-9])*__$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isObjectInitializer: {
    value: function (param) {
      if (typeof param === 'object' && Object.getPrototypeOf(param) === Object.prototype) {
        return true;
      }
      return false;
    }
  },

  addConstructor: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidConstructorName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: false,
            enumerable: false,
            configurable: false
          });
        } else {
          throw new TypeException("Constructor's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Constructor's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addField: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: true,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Field's '" + name + "' name is invalid"); 
        }
      } else {
        throw new TypeException("Field's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addSystemField: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidSystemFieldName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: true,
            enumerable: false,
            configurable: false
          });
        } else {
          throw new TypeException("System field's '" + name + "' name is invalid"); 
        }
      } else {
        throw new TypeException("System field's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addMethod: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            value: value,
            writable: false,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Method's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Method's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addProperty: {
    value: function (owner, name, getter, setter) {
      if (owner) {
        if (TypeBuilder.isValidName(name)) {
          Object.defineProperty(owner, name, {
            get: getter,
            set: setter,
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          });
        } else {
          throw new TypeException("Property's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Property's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addConstant: {
    value: function (owner, name, value) {
      if (owner) {
        if (TypeBuilder.isValidConstantName(name)) {
          Object.defineProperty(owner, name, {
            get: function () { return value; },
            enumerable: TypeBuilder.isPublic(name),
            configurable: false
          }); 
        } else {
          throw new TypeException("Constant's name is invalid: '" + name + "'");
        }
      } else {
        throw new TypeException("Constant's '" + name + "' owner can't be null");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addStatic: {
    value: function (owner, properties) {
      TypeBuilder.forEach(properties, function (name, value) {
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(owner, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          TypeBuilder.addMethod(owner, name, value);
        } else if (TypeBuilder.isProperty(value)) {
          TypeBuilder.addProperty(owner, name, value['get'], value['set']);
        } else if (TypeBuilder.isConstant(name)) {
          TypeBuilder.addConstant(owner, name, value);
        } else {
          TypeBuilder.addField(owner, name, value);
        }
      });
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  addEvents: {
    value: function (owner, properties) {
      if (owner) {
        TypeBuilder.forEach(properties, function (name, value) {
          if (TypeBuilder.isValidEventName(name)) {
            if (typeof owner['__events__'] === 'undefined') {
              owner['__events__']= Object.create(null);
            }
            Object.defineProperty(owner['__events__'], name, {
              value: value,
              writable: false,
              enumerable: true,
              configurable: false
            });
          } else {
            throw new TypeException("Event's name is invalid");
          }
        });
        if (typeof owner['__events__'] !== 'undefined') {
          Object.freeze(owner['__events__']);
        }
      } else {
        throw new TypeException("Event's owner is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isConstructor: {
    value: function (name) {
      return name == '__construct__';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isMethod: {
    value: function (value) {
      return typeof value === 'function'; 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isProperty: {
    value: function (value) {
      return value && (value['get'] || value['set']);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isConstant: {
    value: function (name) {
      return /^([A-Z]|[0-9]|_)*$/g.test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  isStatic: {
    value: function (name) {
      return name == '__static__';
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  isEvents: {
    value: function (name) {
      return name === '__events__';
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isField: {
    value: function (name, value) {
      return !TypeBuilder.isConstructor(name) && !TypeBuilder.isMethod(value) 
        && !TypeBuilder.isProperty(value) && !TypeBuilder.isConstant(name) 
        && !TypeBuilder.isStatic(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  forEach: {
    value: function (properties, callback) {
      if (properties) {
        if (typeof callback === 'function') {
          var names = Object.keys(properties);
          for (var i = 0; i < names.length; i++) {
            callback(names[i], properties[names[i]]);
          } 
        } else {
          throw new TypeException("Callback is not function");
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  getArgumentNames: {
    value: function (func) {
      if (func) {
        var str = func.toString()
          .match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
          .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
          .replace(/\s+/g, '');
        if (str) {
          return str.split(',');
        }
      }
      return [];
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  getPropertyDescriptor: {
    value: function (object, propertyName) {
      if (object && propertyName) {
        var descriptor = Object.getOwnPropertyDescriptor(object, propertyName); 
        if (!descriptor) {
          return TypeBuilder.getPropertyDescriptor(Object.getPrototypeOf(object), propertyName);
        }
        return descriptor;
      }
      return null;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(TypeBuilder);

exports.TypeBuilder = TypeBuilder;