/**
 * @interface {class4js.IEventTarget}
 */
var IEventTarget = Object.create(Object.prototype, {

  /**
   * @memberOf {util4js.IEventTarget}
   * @method addEventListener
   * @param {String} type
   * @param {Function} listener
   */
  addEventListener: {
    value: function (type, listener) { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {util4js.IEventTarget}
   * @method removeEventListener
   * @param {String} type
   * @param {Function} listener
   */
  removeEventListener: { 
    value: function (type, listener) { },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {util4js.IEventTarget}
   * @method dispatchEvent
   * @param {util4js.Event} e 
   */ 
  dispatchEvent: { 
    value: function (e) { },
    writable: false,
    enumerable: true,
    configurable: false
  },
  
  /**
   * @memberOf {class4js.IEventTarget}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return '[object Interface]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(IEventTarget);

exports.IEventTarget = IEventTarget;
