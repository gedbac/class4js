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
          if (typeof interceptors === 'function') {
            interceptors = [ interceptors ];
          } else {
            
          }  
        } else {
          throw new TypeException("Interceptor is not set"); 
        }
        if (typeof type === 'function') {
          
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
          var invocation;
          var descriptor = TypeBuilder.getPropertyDescriptor(type, propertyName);
          if (TypeBuilder.isProperty(descriptor)) {
            Proxy.__intercepProperty(proxy, propertyName, descriptor['get'], 
                descriptor['set'], interceptors);
          } else {
            Proxy.__interceptMethod(proxy, propertyName, interceptors);
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
   * @method __interceptMethod
   * @param {Object} proxy
   * @param {String} propertyName
   * @param {IInterceptor[]} interceptors
   */
  __interceptMethod: {
    value: function (proxy, propertyName, interceptors) {
      TypeBuilder.addMethod(proxy, propertyName, function () {
        var invocation = new Invocation(propertyName, InvocationType.METHOD, 
          arguments, interceptors);
        return invocation.procceed();
      }); 
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
   * @param {Boolean} writable
   * @param {IInterceptor[]} interceptors
   */
  __intercepProperty: {
    value: function (proxy, propertyName, readable, writable, interceptors) {
      var getter, setter;
      if (readable) {
        getter = function () {
          var getterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_GETTER, arguments, interceptors);
          return getterInvocation.procceed();
        };
      } 
      if (writable) {
        setter = function () {
          var setterInvocation = new Invocation(propertyName, 
              InvocationType.PROPERTY_SETTER, arguments, interceptors);
          setterInvocation.procceed();
        };
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
