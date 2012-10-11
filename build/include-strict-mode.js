var fs = require("fs");

fs.readFile("class4js.min.js", "utf8", function (error, data) {
  if (error) {
    console.log(error);
  }
  else {
    var data = data.substr(0, 31) + "\"use strict\";" + data.substr(31, data.length - 31);
    fs.writeFile("class4js.min.js", data, "utf8");
  }
});
