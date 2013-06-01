/**
 * @class {class4js.Event}
 */
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

  /**
   * @memberOf {class4js.Event}
   * @public
   * @constructor {class4js.Event}
   */
  __construct__: {
    value: function () {
      this.__type = null;
      this.__target = null;
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.Event}
   * @public
   * @property {String} type
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
   * @memberOf {class4js.Event}
   * @public
   * @property {String} target
   */
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

  /**
   * @memberOf {class4js.TypeException}
   * @public
   * @method toString
   * @returns {String}
   */
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

  /**
   * @memberOf {class4js.Event}
   * @static
   * @private
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

Object.seal(Event);
Object.seal(Event.prototype);

exports.Event = Event;
