/**
 * @internal
 * @class {class4js.ModuleHandler}
 * @constructor {class4js.ModuleHandler}
 * @param {String} name
 * @param {Object} value
 * @param {Function} callback
 */
var ModuleHandler = function (name, value, callback) {
  this.__loaded = false;
  this.__name = name;
  this.__value = value;
  this.__listeners = [];
  if (callback) {
    this.onLoaded(callback);
  }
  Object.seal(this); 
};

ModuleHandler.prototype = Object.create(Object.prototype, {

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @property {String} isLoaded
   */
  isLoaded: {
    get: function () {
      return this.__loaded;
    },
    set: function (value) {
      this.__loaded = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memebtOf {class4js.ModuleHandler}
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
   * @memebtOf {class4js.ModuleHandler{
   * @public
   * @property {Object} value
   */
  value: {
    get: function () {
      return this.__value;
    },
    set: function (value) {
      this.__value = value;
    },
    enumerable: true,
    configurable: false
  },

  /**
   * @memberOf {class4js.ModuleHandler}
   * @public
   * @method onLoaded
   * @param {Function} callback
   */
  onLoaded: {
    value: function (callback) {
      if (callback && typeof callback === "function") {
        this.__listeners.push(callback);
      } else {
        throw new TypeException("Callback is not set or it's type invalid");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @method fireLoaded
   */
  fireLoaded: {
    value: function () {
      this.__loaded = true;
      for (var i = 0; i < this.__listeners.length; i++) {
        this.__listeners[i].call(this, this.value);
      };
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  /**
   * @memebtOf {class4js.ModuleHandler}
   * @public
   * @method toString
   * @returns {String}
   */
  toString: {
    value: function () {
      return "class4js.ModuleHandler";
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.seal(ModuleHandler);
Object.seal(ModuleHandler.prototype);

