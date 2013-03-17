/**
 * @class {class4js.Invocation}
 * @constructor {class4js.Invocation}
 */
var Invocation = function (name, type, arguments, interceptors) {
  this.__name = name;
  this.__type = type;
  this.__arguments = arguments;
  this.__returnValue = null;
  this.__interceptors = interceptors;
  this.__context = null;
  this.__current = 0;
  Object.seal(this);
};

Invocation.prototype = Object.create(Object.prototype, {

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {String} name
   */
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

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {InvocationType} type
   */
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

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isConstructor
   */
  isConstructor: {
    get: function () {
      return this.__type == InvocationType.CONSTRUCTOR;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isMethod
   */
  isMethod: {
    get: function () {
      return this.__type == InvocationType.METHOD;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isPropertyGetter
   */
  isPropertyGetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_GETTER;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Boolean} isPropertySetter
   */
  isPropertySetter: {
    get: function () {
      return this.__type == InvocationType.PROPERTY_SETTER;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object[]} arguments
   */
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

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object} returnValue
   */
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

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {IInterceptor[]} interceptors
   */
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

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @property {Object} context
   */
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

  /**
   * @memberOf {class4js,Invocation}
   * @public
   * @method procceed
   * @returns {Object}
   */
  procceed: {
    value: function () {
      if (this.__interceptors.length > this.__current) {
        var interceptor = this.__interceptors[this.__current];
        this.__current++;
        if (typeof interceptor === 'function') {
          this.__returnValue = interceptor.call(null, this);
        } else {
          this.__returnValue = interceptor.intercept.call(null, this);    
        } 
      }
      return this.__returnValue;
    },
    writable: false,
    enumerable: true,
    configurable: false 
  },

  /**
   * @memberOf {class4js.Invocation}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return 'class4js.Invocation';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(Invocation);
Object.seal(Invocation.prototype);

exports.Invocation = Invocation;
