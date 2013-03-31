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
      // Check if it is interface or class
      //var constructor = function () {
        // TODO: Invoke parents constructor
        //Object.seal(this);
      //};
      // TODO: Inherit from base type
      //return constructor;
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
          var descriptor = TypeBuilder.getPropertyDescriptor(type, propertyName);
          if (TypeBuilder.isProperty(descriptor)) {
            Proxy.__intercepProperty(proxy, propertyName, descriptor['get'], 
                descriptor['set'], interceptors);
          } else if (TypeBuilder.isMethod(descriptor['value'])) {
            Proxy.__interceptMethod(proxy, propertyName, descriptor, interceptors);
          }
        }
      }
      Object.freeze(proxy);
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
      var proxy = Object.create(type.prototype);
      Class.extend(this);
      for (var propertyName in type) {
        
      } 
      // TODO: Include build in interceptors...
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
   * @method __interceptConstructor
   * @param {Object} proxy
   * @param {IInterceptor[]} interceptors 
   */
  __interceptConstructor: {
    value: function (proxy, interceptors) {
      
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
        var invocation = new Invocation(propertyName, InvocationType.METHOD, 
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
   * @param {IInterceptor[]} interceptors
   */
  __intercepProperty: {
    value: function (proxy, propertyName, descriptor, interceptors) {
      var getter, setter;
      if (descriptor['get']) {
        getter = function () {
          var getterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_GETTER, arguments, interceptors);
          return getterInvocation.procceed();
        };
        TypeBuilder.addMethod(getter, 'toString', function () {
          return descriptor['get'].toString();
        });
      } 
      if (descriptor['set']) {
        setter = function () {
          var setterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_SETTER, arguments, interceptors);
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
