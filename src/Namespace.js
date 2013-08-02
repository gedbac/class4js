var Namespace = Object.create(Object.prototype, {

  create: {
    value: function (name, items) {
      if (name) {
        var fragments = name.split('.'),
            ns, 
            position = 0;
        if (Module.exports) {
          if (fragments[0] !== Module.exportsName) {
            throw new TypeException("Module's name is invalid. Expected '" + fragments[0] + "', but found '" 
              + Module.exportsName + "'.");
          }
          ns = Module.exports;
          position = 1;
        } else {
          ns = global;
        }
        for (var i = position; i < fragments.length; i++) {
          if (!(fragments[i] in ns)) {
            ns[fragments[i]] = {}; 
          }
          ns = ns[fragments[i]]; 
        }
        if (items) {
          for (var propertyName in items) {
            ns[propertyName] = items[propertyName];
          }
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