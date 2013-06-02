var Invocation = function (target, name, type, arguments, interceptors) {
  this.__target = target;
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