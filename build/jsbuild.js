var fs = require("fs");

fs.readFile("class4js.min.js", "utf8", function (error, data) {
  if (error) {
    console.log(error);
  }
  else {
    var data = data.substr(0, 30) + "\"use strict\";" + data.substr(30, data.length - 30);
    fs.writeFile("class4js.min.js", data, "utf8");
  }
});
