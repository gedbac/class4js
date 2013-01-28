"use strict";

/**
 * @static
 * @class {TestRunner}
 */
var TestRunner = {

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @field {Array} __queue
   */
  __queue: [],

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @field {String} __current
   */
  __current: null,

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @field {Object} __currentTag
   */
  __currentTag: null,

  /**
   * @memberOf {TestRunner}
   * @static
   * @public
   * @method run
   * @param {String} name
   * @param {Function} callback
   */
  run: function (name, callback) {
    if (!TestRunner.__current) {
      TestRunner.__onRun(name, callback);  
    } else {
      TestRunner.__queue.push({ 
        name: name, 
        callback: callback 
      });
    }
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @public
   * @method complete
   * @param {String} name
   */
  complete: function (name) {
    TestRunner.__onComplete(name); 
    TestRunner.__next();
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @public
   * @method print
   * @param {String} message
   */
  print: function (message) {
    console.info(message); 
    var textTag = document.createElement("div");
    textTag.innerHTML = message;
    TestRunner.__currentTag.appendChild(textTag);
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @public
   * @method assert
   * @param {Boolean} condition
   * @param {String} message
   */
  assert: function (condition, message) {
    if (message) {
      console.assert(condition, message);
    } else {
      console.assert(condition);
    }
    if (!condition) {
      var textTag = document.createElement("div");
      textTag.setAttribute("style", "color:red;");
      if (message) {
      textTag.innerHTML = message;
      } else {
        textTag.innerHTML = "Assertion failed";
      }
      TestRunner.__currentTag.appendChild(textTag);
      TestRunner.__onComplete(TestRunner.__current);
      TestRunner.__next();
    }
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @method __onRun
   * @param {String} name
   * @param {Function} callback
   */
  __onRun: function (name, callback) {
    TestRunner.__current = name;
    setTimeout(function () {
      if (TestRunner.__current === name) {
        console.error("Timeout");
        TestRunner.__onComplete(name);
      } 
    }, 5000);
    console.group(name);
    console.time("Execution time");
    var testTag = document.createElement("div");
    var titleTag = document.createElement("h2");
    titleTag.innerHTML = name;
    testTag.appendChild(titleTag); 
    document.getElementById("container").appendChild(testTag);
    TestRunner.__currentTag = testTag;
    callback.apply(window);
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @method __onComplete
   * @param {String} name
   */
  __onComplete: function (name) {
    TestRunner.__current = null;
    TestRunner.__currentTag = null;
    console.timeEnd("Execution time");
    console.groupEnd();
  },

  /**
   * @memberOf {TestRunner}
   * @static
   * @private
   * @method __next
   */
  __next: function () {
    if (TestRunner.__queue.length > 0) {
      var item = TestRunner.__queue.pop();
      TestRunner.__onRun(item.name, item.callback);  
    }
  }

};

var $run = TestRunner.run;
var $complete = TestRunner.complete;
var $print = TestRunner.print;
var $assert = TestRunner.assert;

