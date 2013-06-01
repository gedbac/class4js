/**
 * @class {class4js.EventException}
 * @constructor {class4js.EventException}
 */
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

  /**
   * @memberOf {class4js.EventException}
   * @public
   * @constructor {class4js.EventException}
   */
  __construct__: {
    value: function () {
      this.__name = 'EventException';
      this.__message = message || "An event exception has occurred.";
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.EventException}
   * @public
   * @property {String} name
   */
  name: {
    get: function () {
      return this.__name;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.EventException}
   * @public
   * @property {String} message
   */
  message: {
    get: function () {
     return this.__message;
    },
    enumerable: true,
    configurable: false
  },
  
  /**
   * @memberOf {class4js.EventException}
   * @public
   * @method toString
   * @returns {String}
   */
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

  /**
   * @memberOf {class4js.EventException}
   * @static
   * @public
   * @method toString
   * @returns {String}
   */
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
