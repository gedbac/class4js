var fs = require("fs");
var os = require('os');

if (process.argv.length > 2) {
  var filename = process.argv[2];
  if (fs.existsSync(filename)) {
    var data = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, "'strict mode';" + os.EOL + os.EOL + data, 'utf8');
  } else {
    console.log("Error: File '" + filename + "' not found");
  }
}