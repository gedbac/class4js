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
          var properties = Object.getOwnPropertyNames(prototype['__fields__']);
          var descriptor;
          for (var i = 0; i < properties.length; i++) {
            if (properties[i] === '__events__') {
              var events = Object.getOwnPropertyNames(prototype['__fields__']['__events__']);
              if (events.length > 0 && !instance['__events__']) {
                instance['__events__'] = Object.create(null);
              }
              for (var j = 0; j < events.length; j++) {
                if (!(events[j] in instance['__events__'])) {
                  Object.defineProperty(instance['__events__'], events[j], {
                    value: prototype['__fields__']['__events__'][events[j]],
                    writable: false,
                    enumerable: false,
                    configurable: false
                  });
                } else {
                  throw new TypeException("Event '" + events[j] + "'is already defined");
                }
              }
            } else {
              descriptor = Object.getOwnPropertyDescriptor(prototype['__fields__'], properties[i]);
              if (!(properties[i] in instance)) {
                Object.defineProperty(instance, properties[i], descriptor);
              } else {
                throw new TypeException("Field '" + properties[i] + "'is already defined");
              }
            }
          }
        }
        if (prototype.hasOwnProperty('__construct__')) {
          if (typeof prototype['__construct__'] === 'function') {
            if (args && args.length == 1 && TypeBuilder.isObjectInitializer(args[0])) {
              prototype['__construct__'].apply(instance); 
            } else {
              prototype['__construct__'].apply(instance, args);
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
        TypeBuilder.addSystemField(constructor.prototype['__fields__'], '__wrappers__', null);
        TypeBuilder.addSystemField(constructor.prototype['__fields__'], '__eventdispatcher__', null);
      }
      TypeBuilder.forEach(properties, function (name, value) {
        var hasSupper;
        if (TypeBuilder.isConstructor(name)) {
          TypeBuilder.addConstructor(constructor.prototype, name, value);
        } else if (TypeBuilder.isMethod(value)) {
          hasSupper = Class.__hasSuper(value);
          if (!parent && hasSupper) {
            throw new TypeException("Method '" + name + "' has '$super' parameter, but method's class doesn't have a parent.");
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
          var getter = value['get'];
          if (getter) {
            hasSupper = Class.__hasSuper(getter);
            if (!parent && hasSupper) {
              throw new TypeException("Property '" + name + "' has '$super' parameter, but property's class doesn't have a parent.");
            }
            if (parent && hasSupper) {
              getter = function () {
                return value['get'].call(this, Class.__wrap(this, parent.prototype));
              };
              TypeBuilder.addMethod(getter, 'toString', function () {
                return value['get'].toString();
              });
            }
          }
          var setter = value['set'];
          if (setter) {
            hasSupper = Class.__hasSuper(setter);
            if (!parent && hasSupper) {
              throw new TypeException("Property '" + name + "' has '$super' parameter, but property's class doesn't have a parent.");
            }
            if (parent && hasSupper) {
              setter = function () {     
                var args = [ Class.__wrap(this, parent.prototype) ];
                if (arguments && arguments.length > 0) {
                  args.push(arguments[0]);
                }
                value['set'].apply(this, args);
              };
              TypeBuilder.addMethod(setter, 'toString', function () {
                return value['set'].toString();
              });
            }
          }
          TypeBuilder.addProperty(constructor.prototype, name, getter, setter);
        } else if (TypeBuilder.isConstant(name)) { 
          TypeBuilder.addConstant(constructor, name, value);
        } else if (TypeBuilder.isStatic(name)) {
          TypeBuilder.addStatic(constructor, value); 
        } else if (TypeBuilder.isEvents(name)) {
          TypeBuilder.addEvents(constructor.prototype['__fields__'], value);
        } else {
          TypeBuilder.addField(constructor.prototype['__fields__'], name, value);
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