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
          } else if (TypeBuilder.isMethod(descriptor['value'])) {
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
          if (descriptor['get']) {
            getterInterceptors = interceptors.slice(0);
            getterInterceptors.push(function (invocation) {
              return descriptor['get'].call(invocation.target); 
            });
          }
          var setterInterceptors;
          if (descriptor['set']) {
            setterInterceptors = interceptors.slice(0);
            setterInterceptors.push(function (invocation) {
              descriptor['set'].apply(invocation.target, invocation.arguments);
            });
          }
          Proxy.__intercepProperty(target, propertyName, descriptor, 
              getterInterceptors, setterInterceptors);
        } else if (TypeBuilder.isMethod(descriptor['value'])) {
          interceptors = interceptors.slice(0);
          interceptors.push(function (invocation) {
            return descriptor['value'].apply(invocation.target, invocation.arguments); 
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
          return descriptor['value'].toString();
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
        return descriptor['value'].toString();
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
      if (descriptor['get']) {
        getter = function () {
          var getterInvocation = new Invocation(this, propertyName, 
              InvocationType.PROPERTY_GETTER, arguments, getterInterceptors);
          return getterInvocation.procceed();
        };
        TypeBuilder.addMethod(getter, 'toString', function () {
          return descriptor['get'].toString();
        });
      } 
      if (descriptor['set']) {
        setter = function () {
          var setterInvocation = new Invocation(this, propertyName, 
              InvocationType.PROPERTY_SETTER, arguments, setterInterceptors);
          setterInvocation.procceed();
        };
        TypeBuilder.addMethod(setter, 'toString', function () {
          return descriptor['set'].toString();
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