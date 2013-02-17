var Component = $abstract_class({
  __construct__: function () { 
    this.__name = 'Component';
  },
  name: { 
    get: function () { 
      return this.__name; 
    },
    set: function (value) { 
      this.__name = value; 
    }
  }
}); 

var Button = $class({
  __construct__: function () {
    this.name = 'Button1';
  }
}, Component)

try {
  var component = new Component(); 
} catch (ex) {
  console.log(ex.message);
} 

var button = new Button();
