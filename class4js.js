'strict mode';

var class4js = (function (global) {

var exports = {};

if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function (instance) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function () {
      return fn.apply(instance, args.concat(slice.call(arguments)));
    };
  };
}

var TypeException = function (message) {
  this.__name = 'TypeException';
  this.__message = message || "A type exception has occurred.";
  Object.seal(this);
};

TypeException.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  message: {
    get: function () {
      return this.__message;
    },
    set: function (value) {
      this.__message = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return this.name + ': ' + this.message;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(TypeException, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(TypeException);
Object.seal(TypeException.prototype);

exports.TypeException = TypeException;

var Namespace = Object.create(Object.prototype, {

  create: {
    value: function (name, items) {
      if (name) {
        var fragments = name.split('.'),
            ns,
            position = 0;
        if (Module.exports) {
          if (fragments[0] !== Module.exportsName) {
            throw new TypeException("Module's name is invalid. Expected '" + fragments[0] + "', but found '" +
              Module.exportsName + "'.");
          }
          ns = Module.exports;
          position = 1;
        } else {
          ns = global;
        }
        for (var i = position; i < fragments.length; i++) {
          if (!(fragments[i] in ns)) {
            ns[fragments[i]] = {};
          }
          ns = ns[fragments[i]];
        }
        if (items) {
          for (var propertyName in items) {
            ns[propertyName] = items[propertyName];
          }
        }
      } else {
        throw new TypeException("Namespace is not set");
      }
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

Object.freeze(Namespace);

global.$namespace = Namespace.create;

exports.Namespace = Namespace;

var TypeBuilder = Object.create(Object.prototype, {

  isPrivate: {
    value: function (name) {
      return new RegExp('^__([A-Z]|[a-z]|[0-9])*$', 'g').test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isProtected: {
    value: function (name) {
      return new RegExp('^_([A-Z]|[a-z]|[0-9])*$', 'g').test(name);
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
      return new RegExp('^[A-Z]([A-Z]|[a-z]|[0-9])*$','g').test(name);
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
      return new RegExp('^(_|__|[a-z])([a-z]|[A-Z]|[0-9])*$', 'g').test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidConstantName: {
    value: function (name) {
      return new RegExp('^([A-Z]|[0-9]|_)*$', 'g').test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidEventName: {
    value: function (name) {
      return new RegExp('^([a-z])([a-z]|[A-Z]|[0-9])*$', 'g').test(name);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidSystemFieldName: {
    value: function (name) {
      return new RegExp('^__([a-z]|[A-Z]|[0-9])*__$', 'g').test(name);
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
          TypeBuilder.addProperty(owner, name, value.get, value.set);
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
            if (typeof owner.__events__ === 'undefined') {
              owner.__events__= Object.create(null);
            }
            Object.defineProperty(owner.__events__, name, {
              value: value,
              writable: false,
              enumerable: true,
              configurable: false
            });
          } else {
            throw new TypeException("Event's name is invalid");
          }
        });
        if (typeof owner.__events__ !== 'undefined') {
          Object.freeze(owner.__events__);
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
      return value && (value.get || value.set);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isConstant: {
    value: function (name) {
      return new RegExp('^([A-Z]|[0-9]|_)*$', 'g').test(name);
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
      return !TypeBuilder.isConstructor(name) && !TypeBuilder.isMethod(value) &&
        !TypeBuilder.isProperty(value) && !TypeBuilder.isConstant(name) && !TypeBuilder.isStatic(name);
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

var TypeExtension = function (target, name, value) {
  this.__target = target;
  this.__name = name;
  this.__value = value;
  Object.seal(this);
};

TypeExtension.prototype = Object.create(Object.prototype, {

  target: {
    get: function () {
      return this.__target;
    },
    enumerable: true,
    configurable: false
  },

  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  value: {
    get: function () {
      return this.__value;
    },
    enumerable: true,
    configurable: false
  },

  toString: function () {
    return '[object class4js.TypeExtension]';
  }

});

Object.defineProperties(TypeExtension, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(TypeExtension);
Object.seal(TypeExtension.prototype);

var Class = Object.create(Object.prototype, {

  __extensions: {
    value: [],
    writable: true,
    enumerable: false,
    configurable: false
  },

  create: {
    value: function (properties, parent, interfaces) {
      if (arguments.length === 2) {
        if (typeof parent === 'object' || parent instanceof Array) {
          interfaces = parent;
          parent = null;
        }
      }
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), arguments);
        if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
          ObjectFactory.initialize(this, arguments[0]);
        }
        Object.seal(this);
      };
      Class.__onCreateClass(constructor, properties, parent, interfaces);
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  createAbstract: {
    value: function (properties, parent, interfaces) {
      if (arguments.length === 2) {
        if (typeof parent === 'object' || parent instanceof Array) {
          interfaces = parent;
          parent = null;
        }
      }
      var constructor = function () {
        throw new TypeException("Abstract class can't be instantiated");
      };
      Class.__onCreateClass(constructor, properties, parent, interfaces);
      return constructor;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  createStatic: {
    value: function (properties) {
      var obj = Object.create(Object.prototype);
      TypeBuilder.addSystemField(obj, '__eventdispatcher__', null);
      TypeBuilder.addStatic(obj, properties);
      TypeBuilder.addMethod(obj, 'toString', function () {
        return '[object Class]';
      });
      Class.includeEvents(constructor.prototype);
      Class.initialize(obj, obj);
      Object.seal(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  addExtension: {
    value: function (target, name, value) {
      if (!target) {
        throw new TypeException("Target is not set");
      }
      if (!name) {
        throw new TypeException("Method name is not set");
      }
      if (!TypeBuilder.isPublic(name)) {
        throw new TypeException("Only public methods can be added");
      }
      if (!value || !TypeBuilder.isMethod(value)) {
        throw new TypeException("Method is not set");
      }
      if (!TypeBuilder.isMethod(value)) {
        throw new TypeException("Method is invalid");
      }
      Class.__extensions.push(new TypeExtension(target, name, value));
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  initialize: {
    value: function (instance, prototype, args) {
      if (prototype) {
        var parent = Object.getPrototypeOf(prototype);
        if (parent && parent !== Object.prototype) {
          Class.initialize(instance, parent, args);
        }
        if (prototype.hasOwnProperty('__fields__')) {
          var properties = Object.getOwnPropertyNames(prototype.__fields__);
          var descriptor;
          for (var i = 0; i < properties.length; i++) {
            if (properties[i] === '__events__') {
              var events = Object.getOwnPropertyNames(prototype.__fields__.__events__);
              if (events.length > 0 && !instance.__events__) {
                instance.__events__ = Object.create(null);
              }
              for (var j = 0; j < events.length; j++) {
                if (!(events[j] in instance.__events__)) {
                  Object.defineProperty(instance.__events__, events[j], {
                    value: prototype.__fields__.__events__[events[j]],
                    writable: false,
                    enumerable: false,
                    configurable: false
                  });
                } else {
                  throw new TypeException("Event '" + events[j] + "'is already defined");
                }
              }
            } else {
              descriptor = Object.getOwnPropertyDescriptor(prototype.__fields__, properties[i]);
              if (!(properties[i] in instance)) {
                Object.defineProperty(instance, properties[i], descriptor);
              } else {
                throw new TypeException("Field '" + properties[i] + "'is already defined");
              }
            }
          }
        }
        if (prototype.hasOwnProperty('__construct__')) {
          if (typeof prototype.__construct__ === 'function') {
            if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
              prototype.__construct__.apply(instance);
            } else {
              prototype.__construct__.apply(instance, args);
            }
          } else {
            throw new TypeException("Class member's '__construct__' type is invalid");
          }
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  includeExtensions: {
    value: function (instance) {
      if (instance && Class.__extensions && Class.__extensions.length > 0) {
        for (var i = 0; i < Class.__extensions.length; i++) {
          var extension = Class.__extensions[i];
          if (Interface.instanceOf(instance, extension.target)) {
            if (!(extension.name in instance)) {
              TypeBuilder.addMethod(instance, extension.name, extension.value);
            }
          }
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  includeEvents: {
    value: function (owner) {
      if (owner) {
        if (!('addEventListener' in owner)) {
          Object.defineProperty(owner, 'addEventListener', {
            value: function (type, listener) {
              if (!this.__eventdispatcher__) {
                this.__eventdispatcher__ = new EventDispatcher();
              }
              this.__eventdispatcher__.addEventListener(type, listener);
            },
            writable: false,
            enumerable: true,
            configurable: false
          });
        }
        if (!('removeEventListener' in owner)) {
          Object.defineProperty(owner, 'removeEventListener', {
            value: function (type, listener) {
              if (this.__eventdispatcher__) {
                this.__eventdispatcher__.removeEventListener(type, listener);
              }
            },
            writable: false,
            enumerable: true,
            configurable: false
          });
        }
        if (!('removeAllEventListeners' in owner)) {
          Object.defineProperty(owner, 'removeAllEventListeners', {
            value: function (type) {
              if (this.__eventdispatcher__) {
                this.__eventdispatcher__.removeAllEventListeners(type);
              }
            },
            writable: false,
            enumerable: true,
            configurable: false
          });
        }
        if (!('dispatchEvent' in owner)) {
          Object.defineProperty(owner, 'dispatchEvent', {
            value: function (e) {
              if (this.__eventdispatcher__) {
                this.__eventdispatcher__.dispatchEvent($create(Event, e));
              }
            },
            writable: false,
            enumerable: true,
            configurable: false
          });
        }
        if (!('on' in owner)) {
          Object.defineProperty(owner, 'on', {
            value: function (type, listener) {
              if (!type) {
                throw new EventException({ message: "Event's 'type' is not set." });
              }
              if (!this.__events__ || !(type in this.__events__)) {
                throw new EventException({ message: "Event '" + type + "' is not declared." });
              }
              this.addEventListener(type, listener);
              return this;
            },
            writable: false,
            enumerable: true,
            configurable: false
          });
        }
        if (!('fire' in owner)) {
          Object.defineProperty(owner, 'fire', {
            value: function (type, options) {
              if (!type) {
                throw new EventException({ message: "Event's 'type' is not set." });
              }
              if (!this.__events__ || !(type in this.__events__)) {
                throw new EventException({ message: "Event '" + type + "' is not declared." });
              }
              var event = ObjectFactory.create(this.__events__[type], {
                target: this,
                type: type
              });
              if (options) {
                ObjectFactory.initialize(event, options);
              }
              this.dispatchEvent(event);
              return this;
            }
          });
        }
      }
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
  },

  __descriptorsAreEqual: {
    value: function (property, source, target) {
      var sourceArguments, targetArguments;
      for (var propertyName in target) {
        if (propertyName != 'writable' && propertyName != 'enumerable' && propertyName != 'configurable') {
          if (!(propertyName in source) || typeof target[propertyName] !== typeof source[propertyName]) {
            throw new TypeException("Implementation of the property '" + propertyName + "' is invalid");
          }
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __instanceOf: {
    value: function (source, target) {
      if (source && target) {
        for (var propertyName in target) {
          if (!(propertyName in source)) {
            throw new TypeException("Class doesn't implemet property: " + propertyName);
          } else {
            var sourceDescriptor = TypeBuilder.getPropertyDescriptor(source, propertyName);
            var targetDescriptor = TypeBuilder.getPropertyDescriptor(target, propertyName);
            Class.__descriptorsAreEqual(propertyName, sourceDescriptor, targetDescriptor);
          }
        }
        return true;
      } else {
        throw new TypeException("Source or target is not set");
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __onCreateClass: {
    value: function (constructor, properties, parent, interfaces) {
      if (parent) {
        constructor.prototype = Object.create(parent.prototype);
      } else {
        constructor.prototype = Object.create(Object.prototype);
        TypeBuilder.addMethod(constructor, 'toString', function () {
          return '[object Class]';
        });
      }
      if (!constructor.prototype.hasOwnProperty('__fields__')) {
        Object.defineProperty(constructor.prototype, '__fields__', {
          value: Object.create(null),
          writable: true,
          enumerable: false,
          configurable: false
        });
      }
      if (!parent) {
        TypeBuilder.addSystemField(constructor.prototype.__fields__, '__wrappers__', null);
        TypeBuilder.addSystemField(constructor.prototype.__fields__, '__eventdispatcher__', null);
      }
      TypeBuilder.forEach(properties, function (name, value) {
        var hasSupper;
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(constructor.prototype, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          hasSupper = Class.__hasSuper(value);
          if (!parent && hasSupper) {
            throw new TypeException("Method '" + name + "' has '$super' parameter, but method's class doesn't have " +
              "a parent.");
          }
          if (parent && Class.__hasSuper(value)) {
            var method = function () {
              var args = [ Class.__wrap(this, parent.prototype) ];
              if (arguments) {
                for (var i = 0; i < arguments.length; i++) {
                  args.push(arguments[i]);
                }
              }
              return value.apply(this, args);
            };
            TypeBuilder.addMethod(method, 'toString', function () {
              return value.toString();
            });
            TypeBuilder.addMethod(constructor.prototype, name, method);
          } else {
            TypeBuilder.addMethod(constructor.prototype, name, value);
          }
        } else if (TypeBuilder.isProperty(value)) {
          var getter = value.get;
          if (getter) {
            hasSupper = Class.__hasSuper(getter);
            if (!parent && hasSupper) {
              throw new TypeException("Property '" + name + "' has '$super' parameter, but property's class doesn't " +
                "have a parent.");
            }
            if (parent && hasSupper) {
              getter = function () {
                return value.get.call(this, Class.__wrap(this, parent.prototype));
              };
              TypeBuilder.addMethod(getter, 'toString', function () {
                return value.get.toString();
              });
            }
          }
          var setter = value.set;
          if (setter) {
            hasSupper = Class.__hasSuper(setter);
            if (!parent && hasSupper) {
              throw new TypeException("Property '" + name + "' has '$super' parameter, but property's class doesn't " +
                "have a parent.");
            }
            if (parent && hasSupper) {
              setter = function () {
                var args = [ Class.__wrap(this, parent.prototype) ];
                if (arguments && arguments.length > 0) {
                  args.push(arguments[0]);
                }
                value.set.apply(this, args);
              };
              TypeBuilder.addMethod(setter, 'toString', function () {
                return value.set.toString();
              });
            }
          }
          TypeBuilder.addProperty(constructor.prototype, name, getter, setter);
        } else if (TypeBuilder.isConstant(name)) {
          TypeBuilder.addConstant(constructor, name, value);
        } else if (TypeBuilder.isStatic(name)) {
          TypeBuilder.addStatic(constructor, value);
        } else if (TypeBuilder.isEvents(name)) {
          TypeBuilder.addEvents(constructor.prototype.__fields__, value);
        } else {
          TypeBuilder.addField(constructor.prototype.__fields__, name, value);
        }
      });
      if (!('toString' in constructor.prototype)) {
        TypeBuilder.addMethod(constructor.prototype, 'toString', function () {
          return '[object Class]';
        });
      }
      Class.includeEvents(constructor.prototype);
      Class.initialize(constructor, constructor);
      Object.seal(constructor);
      Object.seal(constructor.prototype);
      if (interfaces) {
        if (interfaces instanceof Array) {
          for (var i = 0; i < interfaces.length; i++) {
            Class.__instanceOf(constructor.prototype, interfaces[i]);
          }
        } else {
          Class.__instanceOf(constructor.prototype, interfaces);
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __hasSuper: {
    value: function (func) {
      var names = TypeBuilder.getArgumentNames(func);
      if (names.length > 0 && names[0] === '$super') {
        return true;
      }
      return false;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __wrap: {
    value: function (instance, prototype) {
      if ('__wrappers__' in instance && instance.__wrappers__) {
        for (var i = 0; i < instance.__wrappers__.length; i++) {
          if (instance.__wrappers__[i].proto === prototype) {
            return instance.__wrappers__[i].wrapper;
          }
        }
      }
      var wrapper = Object.create(Object.prototype);
      Class.__buildWrapper(instance, wrapper, prototype);
      Object.seal(wrapper);
      if ('__wrappers__' in instance) {
        if (!instance.__wrappers__) {
          instance.__wrappers__ = [];
        }
        instance.__wrappers__.push({ proto: prototype, wrapper: wrapper });
      }
      return wrapper;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __buildWrapper: {
    value: function (instance, wrapper, prototype) {
      if (prototype && prototype !== Object.prototype) {
        var descriptor;
        var properties = Object.getOwnPropertyNames(prototype);
        for (var i = 0; i < properties.length; i++) {
          if (!TypeBuilder.isValidSystemFieldName(properties[i]) && !(properties[i] in wrapper)) {
            descriptor = Object.getOwnPropertyDescriptor(prototype, properties[i]);
            if (descriptor.value) {
              Object.defineProperty(wrapper, properties[i], {
                value: descriptor.value.bind(instance),
                writable: descriptor.writable,
                enumerable: descriptor.enumerable,
                configurable: descriptor.configurable
              });
            } else {
              Object.defineProperty(wrapper, properties[i], {
                get: descriptor.get ? descriptor.get.bind(instance) : undefined,
                set: descriptor.set ? descriptor.set.bind(instance) : undefined,
                enumerable: descriptor.enumerable,
                configurable: descriptor.configurable
              });
            }
          }
        }
        Class.__buildWrapper(instance, wrapper, Object.getPrototypeOf(prototype));
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});

Object.freeze(Class);

global.$class = Class.create;
global.$abstract_class = Class.createAbstract;
global.$static_class = Class.createStatic;
global.$extend = Class.addExtension;

exports.Class = Class;

var Interface = Object.create(Object.prototype, {

  create: {
    value: function (properties, parents) {
      var obj = Object.create(Object.prototype);
      TypeBuilder.addMethod(obj, 'toString', function () {
        return '[object Interface]';
      });
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
        if (!(name in obj)) {
          if (TypeBuilder.isMethod(value)) {
            TypeBuilder.addMethod(obj, name, value);
          } else if (TypeBuilder.isProperty(value)) {
            TypeBuilder.addProperty(obj, name, value.get, value.set);
          } else {
            throw new TypeException("Member '" + name + "' is invalid");
          }
        }
      });
      Object.freeze(obj);
      return obj;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  instanceOf: {
    value: function (source, target) {
      if (source && target) {
        if (typeof target === 'object') {
          for (var propertyName in target) {
            if (!(propertyName in source)) {
              return false;
            }
          }
        } else if (!(source instanceof target)) {
          return false;
        }
        return true;
      } else {
        throw new TypeException("Source or target is not set");
      }
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
  },

  __copyParentMembers: {
    value: function (target, source) {
      if (source) {
        for (var propertyName in source) {
          if (!(propertyName in target)) {
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
global.$is = Interface.instanceOf;

exports.Interface = Interface;

var ObjectFactory = Object.create(Object.prototype, {

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

var IInterceptor = Object.create(Object.prototype, {

  intercept: {
    value: function (invocation) { },
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
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;

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

exports.InvocationType = InvocationType;

var Invocation = function (target, name, type, args, interceptors) {
  this.__target = target;
  this.__name = name;
  this.__type = type;
  this.__arguments = args;
  this.__returnValue = null;
  this.__interceptors = interceptors;
  this.__context = null;
  this.__current = 0;
  Object.seal(this);
};

Invocation.prototype = Object.create(Object.prototype, {

  target: {
    get: function () {
      return this.__target;
    },
    set: function (value) {
      this.__target = value;
    }
  },

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  type: {
    get: function () {
      return this.__type;
    },
    set: function (value) {
      this.__type = value;
    },
    enumerable: true,
    configurable: false
  },

  isConstructor: {
    get: function () {
      return this.__type == InvocationType.CONSTRUCTOR;
    },
    enumerable: true,
    configurable: false
  },

  isMethod: {
    get: function () {
      return this.__type == InvocationType.METHOD;
    },
    enumerable: true,
    configurable: false
  },

  isPropertyGetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_GETTER;
    },
    enumerable: true,
    configurable: false
  },

  isPropertySetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_SETTER;
    },
    enumerable: true,
    configurable: false
  },

  arguments: {
    get: function () {
      return this.__arguments;
    },
    set: function (value) {
      this.__arguments = value;
    },
    enumerable: true,
    configurable: false
  },

  returnValue: {
    get: function () {
      return this.__returnValue;
    },
    set: function (value) {
      this.__returnValue = value;
    },
    enumerable: true,
    configurable: false
  },

  interceptors: {
    get: function () {
      return this.__interceptors;
    },
    set: function (value) {
      this.__interceptors = value;
    },
    enumerable: true,
    configurable: false
  },

  context: {
    get: function () {
      return this.__context;
    },
    set: function (value) {
      this.__context = value;
    },
    enumerable: true,
    configurable: false
  },

  procceed: {
    value: function () {
      if (this.__interceptors.length > this.__current) {
        var interceptor = this.__interceptors[this.__current];
        this.__current++;
        if (typeof interceptor === 'function') {
          this.__returnValue = interceptor.call(this.target, this);
        } else {
          this.__returnValue = interceptor.intercept.call(this.target, this);
        }
      }
      return this.__returnValue;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.Invocation]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Invocation, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Invocation);
Object.seal(Invocation.prototype);

exports.Invocation = Invocation;

var IInterceptor = Object.create(Object.prototype, {

  intercept: {
    value: function (invocation) { },
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
  }

});

Object.freeze(IInterceptor);

exports.IInterceptor = IInterceptor;

var Proxy = Object.create(Object.prototype, {

  create: {
    value: function (type, interceptors, args) {
      if (type) {
        if (interceptors) {
          if (typeof interceptors === 'function' || Interface.instanceOf(interceptors, IInterceptor)) {
            interceptors = [ interceptors ];
          } else if (interceptors instanceof Array) {
            for (var interceptor in interceptors) {
              if (typeof interceptor !== 'function' && Interface.instanceOf(interceptor, IInterceptor)) {
                throw new TypeException("Interceptor type is invalid");
              }
            }
          } else {
            throw new TypeException("Interceptor type is invalid");
          }
        } else {
          throw new TypeException("Interceptor is not set");
        }
        if (args && !(args instanceof Array)) {
          args = [ args ];
        }
        if (typeof type === 'function') {
          return Proxy.__createClassProxy(type, interceptors, args);
        } else {
          return Proxy.__createInterfaceProxy(type, interceptors, args);
        }
      } else {
        throw new TypeException("Type is not set");
      }
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
  },

  __createInterfaceProxy: {
    value: function (type, interceptors, args) {
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), args);
        Object.seal(this);
      };
      constructor.prototype = Object.create(Object.prototype);
      Proxy.__interceptClassConstructor(type, constructor.prototype, interceptors);
      for (var propertyName in type) {
        if (TypeBuilder.isPublic(propertyName)) {
          var descriptor = TypeBuilder.getPropertyDescriptor(type, propertyName);
          if (TypeBuilder.isProperty(descriptor)) {
            Proxy.__intercepProperty(constructor.prototype, propertyName, descriptor, interceptors, interceptors);
          } else if (TypeBuilder.isMethod(descriptor.value)) {
            Proxy.__interceptMethod(constructor.prototype, propertyName, descriptor, interceptors);
          }
        }
      }
      Object.seal(constructor);
      Object.seal(constructor.prototype);
      return new constructor();
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __createClassProxy: {
    value: function (type, interceptors, args) {
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), args);
        if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
          ObjectFactory.initialize(this, args[0]);
        }
        Object.seal(this);
      };
      constructor.prototype = Object.create(type.prototype);
      Proxy.__interceptClassConstructor(type.prototype, constructor.prototype, interceptors);
      for (var propertyName in type.prototype) {
        Proxy.__intercepClassMember(type.prototype, constructor.prototype,
          propertyName, interceptors);
      }
      Object.seal(constructor);
      Object.seal(constructor.prototype);
      return new constructor();
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __interceptClassConstructor: {
    value: function (source, target, interceptors) {
      var descriptor = TypeBuilder.getPropertyDescriptor(source, '__construct__');
      Proxy.__interceptConstructor(target, descriptor, interceptors);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  __intercepClassMember: {
    value: function (source, target, propertyName, interceptors) {
      if (TypeBuilder.isPublic(propertyName)) {
        var descriptor = TypeBuilder.getPropertyDescriptor(source, propertyName);
        if (TypeBuilder.isProperty(descriptor)) {
          var getterInterceptors;
          if (descriptor.get) {
            getterInterceptors = interceptors.slice(0);
            getterInterceptors.push(function (invocation) {
              return descriptor.get.call(invocation.target);
            });
          }
          var setterInterceptors;
          if (descriptor.set) {
            setterInterceptors = interceptors.slice(0);
            setterInterceptors.push(function (invocation) {
              descriptor.set.apply(invocation.target, invocation.arguments);
            });
          }
          Proxy.__intercepProperty(target, propertyName, descriptor,
              getterInterceptors, setterInterceptors);
        } else if (TypeBuilder.isMethod(descriptor.value)) {
          interceptors = interceptors.slice(0);
          interceptors.push(function (invocation) {
            return descriptor.value.apply(invocation.target, invocation.arguments);
          });
          Proxy.__interceptMethod(target, propertyName, descriptor, interceptors);
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __interceptConstructor: {
    value: function (proxy, descriptor, interceptors) {
      var constructor = function () {
        var invocation = new Invocation(this, '__construct__', InvocationType.CONSTRUCTOR,
          arguments, interceptors);
        return invocation.procceed();
      };
      if (descriptor) {
        TypeBuilder.addMethod(constructor, 'toString', function () {
          return descriptor.value.toString();
        });
      }
      TypeBuilder.addConstructor(proxy, '__construct__', constructor);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __interceptMethod: {
    value: function (proxy, propertyName, descriptor, interceptors) {
      var method = function () {
        var invocation = new Invocation(this, propertyName, InvocationType.METHOD,
          arguments, interceptors);
        return invocation.procceed();
      };
      TypeBuilder.addMethod(method, 'toString', function () {
        return descriptor.value.toString();
      });
      TypeBuilder.addMethod(proxy, propertyName, method);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __intercepProperty: {
    value: function (proxy, propertyName, descriptor, getterInterceptors, setterInterceptors) {
      var getter, setter;
      if (descriptor.get) {
        getter = function () {
          var getterInvocation = new Invocation(this, propertyName,
              InvocationType.PROPERTY_GETTER, arguments, getterInterceptors);
          return getterInvocation.procceed();
        };
        TypeBuilder.addMethod(getter, 'toString', function () {
          return descriptor.get.toString();
        });
      }
      if (descriptor.set) {
        setter = function () {
          var setterInvocation = new Invocation(this, propertyName,
              InvocationType.PROPERTY_SETTER, arguments, setterInterceptors);
          setterInvocation.procceed();
        };
        TypeBuilder.addMethod(setter, 'toString', function () {
          return descriptor.set.toString();
        });
      }
      TypeBuilder.addProperty(proxy, propertyName, getter, setter);
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});

Object.freeze(Proxy);

global.$proxy = Proxy.create;

exports.Proxy = Proxy;

var ModuleException = function (message) {
  this.__name = 'ModuleException';
  this.__message = message || "A module exception has occurred.";
  Object.seal(this);
};

ModuleException.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  message: {
    get: function () {
      return this.__message;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return this.name + ': ' + this.message;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(ModuleException, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleException);
Object.seal(ModuleException.prototype);

exports.ModuleException = ModuleException;

var ModuleConfiguration = function () {
  this.__name = null;
  this.__path = null;
  Object.seal(this);
};

ModuleConfiguration.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  path: {
    get: function () {
      return this.__path;
    },
    set: function (value) {
      this.__path = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.ModuleConfiguration]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(ModuleConfiguration, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleConfiguration);
Object.seal(ModuleConfiguration.prototype);

exports.ModuleConfiguration = ModuleConfiguration;

var Configuration = function () {
  this.__debug = false;
  this.__basePath = null;
  this.__modules = [];
  Object.seal(this);
};

Configuration.prototype = Object.create(Object.prototype, {

  debug: {
    get: function () {
      return this.__debug;
    },
    set: function (value) {
      this.__debug = value;
    },
    enumerable: true,
    configurable: false
  },

  basePath: {
    get: function () {
      return this.__basePath;
    },
    set: function (value) {
      this.__basePath = value;
    },
    enumerable: true,
    configurable: false
  },

  modules: {
    get: function () {
      return this.__modules;
    },
    set: function (value) {
      if (value) {
        for (var i = 0; i < value.length; i++) {
          this.__modules.push(ObjectFactory.create(ModuleConfiguration, value[i]));
        }
      } else {
        this.__modules = [];
      }
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.Configuration]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Configuration, {

  __configuration: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  debug: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.debug;
      }
      return false;
    },
    enumerable: true,
    configurable: false
  },

  basePath: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.basePath;
      }
      return null;
    },
    enumerable: true,
    configurable: false
  },

  modules: {
    get: function () {
      if (Configuration.__configuration) {
        return Configuration.__configuration.modules;
      }
      return null;
    },
    enumerable: true,
    configure: false
  },

  configure: {
    value: function (options) {
      Configuration.__configuration = ObjectFactory.create(Configuration, options);
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

Object.seal(Configuration);
Object.seal(Configuration.prototype);

global.$configure = Configuration.configure;

exports.Configuration = Configuration;

var Module = function (name) {
  this.__name = name;
  this.__loaded = false;
  this.__value = {};
  this.__loadedListeners = [];
  Object.seal(this);
};

Module.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  value: {
    get: function () {
      return this.__value;
    },
    set: function (value) {
      this.__value = value;
    },
    enumerable: true,
    configurable: false
  },

  isLoaded: {
    get: function () {
      return this.__loaded;
    },
    set: function (value) {
      this.__loaded = value;
    },
    enumerable: true,
    configurable: false
  },

  on: {
    value: function (name, callback) {
      if (!name || name !== 'loaded') {
        throw new ModuleException("Event's name is not set or name's type is invalid");
      }
      if (!callback || typeof callback !== 'function') {
        throw new ModuleException("Callback is not set or it's type invalid");
      }
      this.__loadedListeners.push(callback);
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  fire: {
    value: function (name) {
      if (!name || name !== 'loaded') {
        throw new ModuleException("Event's name is not set or name's type is invalid");
      }
      this.__loaded = true;
      for (var i = 0; i < this.__loadedListeners.length; i++) {
        this.__loadedListeners[i].call(this, this.value);
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.Module]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Module, {

  __modules: {
    value: [],
    writable: true,
    enumerable: false,
    configurable: false
  },

  __current: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  __exports: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  __exportsName: {
    value: null,
    writable: true,
    enumerable: false,
    configurable: false
  },

  exports: {
    get: function () {
      return Module.__exports;
    },
    enumerable: true,
    configurable: false
  },

  exportsName: {
    get: function () {
      return Module.__exportsName;
    },
    enumerable: true,
    configurable: false
  },

  create: {
    value: function (callback, dependencies) {
      if (!Module.__current) {
        Module.__current = new Module('main');
      }
      var definition = Module.__current;
      if (Configuration.debug) {
        console.log("Creating module '" + definition.name + "'");
      }
      var args = [];
      var onLoaded = function () {
        args.push(definition.value);
        args.push(global);
        Module.__exports = definition.value;
        Module.__exportsName = Module.__getExportsName(callback, dependencies);
        callback.apply(null, args);
        Module.__exports = null;
        Module.__exportsName = null;
        definition.isLoaded = true;
        if (Configuration.debug) {
          console.log("Module '" + definition.name + "' was created");
        }
        definition.fire('loaded');
      };
      if (dependencies && dependencies.length > 0) {
        var index = 0;
        var fn = function (dependency) {
          args.push(dependency);
          index++;
          if (index < dependencies.length) {
            Module.__loadDependency(dependencies[index], fn);
          } else {
            onLoaded();
          }
        };
        Module.__loadDependency(dependencies[index], fn);
      } else {
        onLoaded();
      }
      return definition.value;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isLoaded: {
    value: function (name) {
      if (name && typeof name === 'string') {
        var handler = Module.__find(name);
        if (handler) {
          return handler.isLoaded;
        }
      } else {
        throw new ModuleException("Type of parameter 'name' is invalid");
      }
    },
    writable: true,
    enumerable: true,
    configurable: false
  },

  load: {
    value: function (name, callback) {
      if (name) {
        if (!Module.isValidModuleName(name)) {
          throw new TypeException("Module's name '" + name + "' is invalid");
        }
        var definition = Module.__find(name);
        if (definition) {
          if (definition.isLoaded) {
            if (Configuration.debug) {
              console.log("Module '" + name + "' was returned from cache");
            }
            if (callback) {
              callback(definition.value);
            }
          } else {
            throw new ModuleException("Circular reference for module '" +
              name + "' was detected");
          }
        } else {
          if (Configuration.debug) {
            console.log("Loading module '" + name + "'");
          }
          definition = new Module(name);
          Module.__current = definition;
          Module.__modules.push(definition);
          Module.__loadScript(definition, function () {
            if (Configuration.debug) {
              console.log("Module '" + name + "' was loaded");
            }
            if (callback) {
              callback(definition.value);
            }
          });
        }
      } else {
        throw new ModuleException("Module's name is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  isValidModuleName: {
    value: function (name) {
      return new RegExp('^(_|[a-z]|[A-Z]|[0-9]|)*$', 'g').test(name);
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
  },

  __loadMainModule: {
    value: function () {
      if (!Module.__hasRequire()) {
        var mainScript;
        var scripts = document.getElementsByTagName('script');
        var onError = function (e) {
          throw new ModuleException("Failed to load module '" + mainScript + "'");
        };
        for (var i = 0;i < scripts.length; i++) {
          mainScript = scripts[i].getAttribute('data-main');
          if (mainScript) {
            var script = document.createElement('script');
            script.async = true;
            script.src = mainScript;
            script.addEventListener('error', onError);
            scripts[i].parentNode.appendChild(script);
            break;
          }
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  __loadDependency: {
    value: function (name, callback) {
      if (typeof name === 'string') {
        Module.load(name, function (dependency) {
          callback(dependency);
        });
      } else {
        callback(name);
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __find: {
    value: function (name) {
      if (name && typeof name === 'string') {
        for (var i = 0; i < Module.__modules.length; i++) {
          if (Module.__modules[i].name === name) {
            return Module.__modules[i];
          }
        }
      }
      return null;
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  __loadScript: {
    value: function (definition, callback) {
      var path = Module.__getModulePath(definition.name);
      if (Module.__hasRequire()) {
        var exported = require(path);
        if (!definition.isLoaded) {
          definition.value = exported;
          definition.isLoaded = true;
        }
        callback();
      } else {
        var script = document.createElement('script');
        script.async = true;
        script.src = path;
        script.addEventListener('error', function (e) {
          throw new ModuleException("Failed to load module '" + definition.name + "'");
        });
        definition.on('loaded', function () {
          callback();
        });
        var head = document.getElementsByTagName('head')[0];
        if (head) {
          head.appendChild(script);
        } else {
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
        }
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __getModulePath: {
    value: function (name) {
      var path = name;
      if (!Module.__hasRequire()) {
        path = './scripts/' + name + '.js';
      }
      if (Configuration.modules) {
        for (var i = 0; i < Configuration.modules.length; i++) {
          if (Configuration.modules[i].name === name) {
            path = Configuration.modules[i].path;
            if (Module.__hasRequire()) {
              var dir = require('path').dirname(process.mainModule.filename);
              if (path.substring(0, 2) === './') {
                path = dir + path.substring(1, path.length);
              } else if (path.substring(0, 3) === '../') {
                path = dir + '/' + path;
              }
            }
            break;
          }
        }
      }
      return path;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __hasRequire: {
    value: function () {
      return typeof require !== 'undefined';
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  __getExportsName: {
    value: function (func, dependencies) {
      var args = TypeBuilder.getArgumentNames(func);
      if (args.length > 0) {
        var index = 0;
        if (dependencies && dependencies.length > 0) {
          index += index + dependencies.length;
          if (index < args.length) {
            return args[index];
          }
        } else {
          return args[index];
        }
      }
      return null;
    },
    writable: false,
    enumerable: false,
    configurable: false
  }

});

Object.seal(Module);
Object.seal(Module.prototype);

Module.__loadMainModule();

global.$module = Module.create;

exports.Module = Module;

var IDisposable = Object.create(Object.prototype, {

  dispose: {
    value: function () {},
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
  }

});

Object.freeze(IDisposable);

exports.IDisposable = IDisposable;

var EventException = function (message) {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

EventException.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function (message) {
      this.__name = 'EventException';
      this.__message = message || "An event exception has occurred.";
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true,
    configurable: false
  },

  message: {
    get: function () {
      return this.__message;
    },
    set: function (value) {
      this.__message = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return this.name + ': ' + this.message;
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(EventException, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(EventException);
Object.seal(EventException.prototype);

exports.EventException = EventException;

var IEventTarget = Object.create(Object.prototype, {

  addEventListener: {
    value: function (type, listener) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  removeEventListener: {
    value: function (type, listener) {},
    writable: false,
    enumerable: true,
    configurable: false
  },

  dispatchEvent: {
    value: function (e) {},
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
  }

});

Object.freeze(IEventTarget);

exports.IEventTarget = IEventTarget;

var IEvent = Object.create(Object.prototype, {

  type: {
    get: function () {},
    set: function (value) {},
    enumerable: true,
    configurable: false
  },

  target: {
    get: function () {},
    set: function (value) {},
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
  }

});

Object.freeze(IEvent);

exports.IEvent = IEvent;

var Event = function () {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

Event.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function () {
      this.__type = null;
      this.__target = null;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  type: {
    get: function () {
      return this.__type;
    },
    set: function (value) {
      this.__type = value;
    },
    enumerable: true,
    configurable: false
  },

  target: {
    get: function () {
      return this.__target;
    },
    set: function (value) {
      this.__target = value;
    },
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.Event]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(Event, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Event);
Object.seal(Event.prototype);

exports.Event = Event;

var IEventListener = Object.create(Object.prototype, {

  handleEvent: {
    value: function (e) {},
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
  }

});

Object.freeze(IEventListener);

exports.IEventListener = IEventListener;

var EventDispatcher = function () {
  if (arguments && arguments.length == 1 && TypeBuilder.isObjectInitializer(arguments[0])) {
    this.__construct__.call(this);
    ObjectFactory.initialize(this, arguments[0]);
  } else {
    this.__construct__.call(this, arguments);
  }
  Object.seal(this);
};

EventDispatcher.prototype = Object.create(Object.prototype, {

  __construct__: {
    value: function () {
      this.__listeners = {};
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  addEventListener: {
    value: function (type, listener) {
      if (!type) {
        throw new EventException({ message: "Parameter 'type' is not set." });
      }
      if (typeof type !== 'string') {
        throw new EventException({ message: "Parameter's 'type' type is invalid." });
      }
      if (!listener) {
        throw new EventException({ message: "Parameter 'listener' is not set." });
      }
      if (typeof listener !== 'function' || Interface.instanceOf(listener, IEventListener)) {
        throw new EventException({ message: "Parameter's 'listener' type is invalid." });
      }
      if (this.__listeners[type]) {
        this.__listeners[type].push(listener);
      } else {
        this.__listeners[type] = [ listener ];
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  removeEventListener: {
    value: function (type, listener) {
      if (!type) {
        throw new EventException({ message: "Parameter 'type' is not set." });
      }
      if (!listener) {
        throw new EventException({ message: "Parameter 'listener' is not set." });
      }
      if (this.__listeners[type]) {
        var index = this.__listeners.indexOf(listener);
        if (index != -1) {
          this.__listeners[type].splice(index, 1);
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  removeAllEventListeners: {
    value: function (type) {
      if (type) {
        if (this.__listeners[type]) {
          delete this.__listeners[type];
        }
      } else {
        for (var listener in this.__listeners) {
          this.removeAllEventListeners(listener);
        }
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  dispatchEvent: {
    value: function (e) {
      if (!Interface.instanceOf(e, IEvent)) {
        throw new EventException({ message: "Event's class doesn't imlement interface 'class4js.IEvent'" });
      }
      if (!e.type) {
        throw new EventException({ message: "Event type is not set" });
      }
      if (this.__listeners[e.type] && this.__listeners[e.type].length > 0) {
        setTimeout(function (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            if (typeof listeners[i] === 'function') {
              listeners[i].call(e.target, e);
            } else {
              listeners[i].handleEvent.call(e.target, e);
            }
          }
        }, 0, this.__listeners[e.type]);
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object class4js.EventDispatcher]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.defineProperties(EventDispatcher, {

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

exports.EventDispatcher = EventDispatcher;

return exports;

}(typeof global !== 'undefined' ? global : window));

if (typeof module !== 'undefined' && module !== null) {
  module.exports = class4js;
}
