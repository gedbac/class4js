'use strict';

require('../../lib/class4js.js');

var IDrawable = $interface({
  draw: function (context) {}
});

var Shape = $class({
  __construct__: function () {
    this.__name = null;
    this.__width = 0;
    console.log('Shape constructor was invoked...');
  },
  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    }
  },
  tags: { 
    get: function () {
      return 'Shape';
    }
  },
  width: {
    get: function () {
      return this.__width;
    },
    set: function (value) {
      this.__width = value;
    }
  },
  getContent: function () {
    return 'None';
  },
  draw: function (context) {
    console.log("Shape '" + this.name +"' is drawn... [status: " + context.status + " ]");
  }
});

var Rectangle = $class({
  __construct__: function () {
    this.__width = 0;
    console.log('Rectangle constructor was invoked...');
  },
  tags: {
    get: function ($super) {
      return $super.tags + ' Rectangle';
    }
  },
  width: {
    get: function ($super) {
      return $super.width;
    },
    set: function ($super, value) {
      $super.width = value + 10;
    }
  },
  draw: function ($super, context) {
    $super.draw(context);
    console.log("Rectangle '" + this.name + "' is drawn... [status: " + context.status + " ]");
  }
}, Shape); 

var Control = $class({
  __construct__: function () {
    console.log('Control constructor was invoked...');
  },
  tags: {
    get: function ($super) {
      return $super.tags + ' Control';
    }
  },
  width: {
    get: function ($super) {
      return $super.width;
    },
    set: function ($super, value) {
      $super.width = value + 2;
    }
  },
  getContent: function ($super) {
    return $super.getContent();
  },
  draw: function ($super, context) {
    $super.draw(context);
    console.log("Control '" + this.name + "' is drawn... [status: " + context.status + " ]");   
  }
}, Rectangle, IDrawable);

var ctr = new Control({ name: 'MyControl' });
ctr.draw({ status: 'OK' });
ctr.width = 100;

console.assert(ctr.getContent() === 'None');
console.assert(ctr.tags === 'Shape Rectangle Control');
console.assert(ctr.width === 112);

// It's required for PhantomJS
if (typeof phantom !== 'undefined') {
  phantom.exit();
}
