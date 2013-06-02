/**
 * @class {class4js.EventDispatcher}
 */
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

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @constructor {class4js.EventDispatcher}b
   */
  __construct__: {
    value: function () {
      this.__listeners = {};
    },
    writable: false,
    enumerable: false,
    configurable: false
  },

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @method addEventListener
   * @param {String} type
   * @param {class4js.IEventListener} listener 
   */
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

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @method removeEventListener
   * @param {String} type
   * @param {class4js.IEventListener} listener 
   */
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

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @method removeAllEventListener
   * @param {String} type
   */  
  removeAllEventListener: {
    value: function (type) {
      if (!type) {
        throw new EventException({ message: "Parameter 'type' is not set." });
      }
      if (this.__listeners[type]) {
        delete this.__listeners[type];
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @method dispatchEvent
   * @param {class4js.Event} e
   */
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

  /**
   * @memberOf {class4js.EventDispatcher}
   * @public
   * @method toString
   * @returns {String}   
   */
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

  /**
   * @memberOf {class4js.EventDispatcher}
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

exports.EventDispatcher = EventDispatcher;
