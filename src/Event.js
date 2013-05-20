/**
 * @class {class4js.Event}
 * @constructor {class4js.Event}
 */
var Event = function () {
  this.__type = null;
  this.__target = null;
  Object.seal(this);
};

Event.prototype = Object.create(Object.prototype, {

  /**
   * @class {class4js.Event}
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
   * @class {class4js.Event}
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

Object.seal(Event);
Object.seal(Event.prototype);

exports.Event = Event;
