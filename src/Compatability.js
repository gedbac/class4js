if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function (instance) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function () {
      return fn.apply(instance, args.concat(slice.call(arguments)));
    };
  };
}