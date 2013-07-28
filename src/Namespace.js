var Namespace = Object.create(Object.prototype, {

  create: {
    value: function (name) {
      if (name) {
        var fragments = name.split('.'),
            parent, 
            position = 0;
        if (Module.exports) {
          parent = Module.exports;
          if (fragments[0] !== Module.exportsName) {
            throw new TypeException("Module's name is invalid. Expected '" + fragments[0] + "', but found '" 
              + Module.exportsName + "'.");
          }
          position = 1;
        } else {
          parent = global;
        }
        for (var i = position; i < fragments.length; i++) {
          if (!(fragments[i] in parent)) {
            parent[fragments[i]] = {}; 
          }
         parent = parent[fragments[i]]; 
        }        
      } else {
        throw new TypeException("Namespace is not set");
      }
    },
    writable: false,
    enumerable: true,
    configurable: false
  },

  toString: {
    value: function () {
      return '[object Class]';
    },
    writable: false,
    enumerable: true,
    configurable: false
  }

});

Object.freeze(Namespace);

global.$namespace = Namespace.create;

exports.Namespace = Namespace;