/**
 * @static
 * @class {class4js.Proxy}
 */
var Proxy = Object.create(null, {

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @public
   * @method create
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   * @returns {Object}
   */
  create: {
    value: function (type, interceptors) {
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
        if (typeof type === 'function') {
          return Proxy.__createClassProxy(type, interceptors);  
        } else {
          return Proxy.__createInterfaceProxy(type, interceptors); 
        }
      } else {
        throw new TypeException("Type is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __createInterfaceProxy
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   * @returns {Object}
   */
  __createInterfaceProxy: {
    value: function (type, interceptors) {
      var proxy = {};
      for (var propertyName in type) {
        if (TypeBuilder.isPublic(propertyName)) {
          if (TypeBuilder.isProperty(descriptor)) {
            Proxy.__intercepProperty(proxy, propertyName, descriptor, interceptors, interceptors);
          } else if (TypeBuilder.isMethod(descriptor['value'])) {
            Proxy.__interceptMethod(proxy, propertyName, descriptor, interceptors);
          }
        }
      }
      Object.seal(proxy);
      return proxy;
    },
    writable: false,
    enumerable: false,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __createClassProxy
   * @param {Object} type
   * @param {IInterceptor[]} interceptors
   */
  __createClassProxy: {
    value: function (type, interceptors) {
      var constructor = function () {
        Class.includeExtensions(this);
        Class.initialize(this, Object.getPrototypeOf(this), arguments);
        Object.seal(this);
      };
      constructor.prototype = Object.create(type.prototype);
      Proxy.__interceptClassConstructor(type.prototype, constructor.prototype, interceptors);
      for (var propertyName in type.prototype) {
        Proxy.__intercepClassMember(type.prototype, constructor.prototype, 
          propertyName, interceptors);
      }
      return new constructor();
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __interceptClassConstructor
   * @param {Object} source
   * @param {Object} target
   * @param {IInterceptor[]} interceptors
   */
  __interceptClassConstructor: {
    value: function (source, target, interceptors) {
      var descriptor = TypeBuilder.getPropertyDescriptor(source, '__construct__');
      if (descriptor) {
        Proxy.__interceptConstructor(target, descriptor, interceptors);
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __intercepClassMember
   * @param {Object} source
   * @param {Object} target
   * @param {String} propertyName
   * @param {IInterceptor[]} interceptors
   */
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

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __interceptConstructor
   * @param {Object} proxy
   * @param {Object} descriptor
   * @param {IInterceptor[]} interceptors 
   */
  __interceptConstructor: {
    value: function (proxy, descriptor, interceptors) {
      var constructor = function () {
        var invocation = new Invocation(this, '__construct__', InvocationType.CONSTRUCTOR, 
          arguments, interceptors);
        return invocation.procceed();
      };
      TypeBuilder.addMethod(constructor, 'toString', function () {
        return descriptor['value'].toString();
      });
      TypeBuilder.addConstructor(proxy, '__construct__', constructor);
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __interceptMethod
   * @param {Object} proxy
   * @param {String} propertyName
   * @param {Object} descriptor
   * @param {IInterceptor[]} interceptors
   */
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

  /**
   * @memberOf {class4js.Proxy}
   * @static
   * @private
   * @method __intercepProperty
   * @param {Object} proxy
   * @param {String} propertyName
   * @param {Boolean} readable
   * @param {Object} descriptor
   * @param {IInterceptor[]} getterInterceptors
   * @param {IInterceptor[]} setterInterceptors
   */
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
