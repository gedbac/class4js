var Namespace = Object.create(Object.prototype, {

  create: {
    value: function (name) {
      if (name) {
        var fragments = name.split('.'),
            parent = global;
        for (var i = 0; i < fragments.length; i++) {
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