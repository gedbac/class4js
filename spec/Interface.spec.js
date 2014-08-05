if (typeof require !== 'undefined' && module !== null) {
  var cls = require('../lib/class4js.js');
}

describe("Interface spec", function() {

  var IShape = $interface({

    toString: function () {
      return "[object IShape]";
    }

  });

  it("should return type name", function () {
    expect(IShape.toString()).toBe("[object IShape]");
  });

  it("should return default type name", function () {
    var ICounter = $interface({});
    expect(ICounter.toString()).toBe("[object Interface]");
  });

});