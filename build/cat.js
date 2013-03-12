var fs = require('fs');
var os = require('os');

if (process.argv.length >= 2) {
    var i, filename, data;
    for (i = 2; i < process.argv.length; i++) {
        filename = process.argv[i];
        if (fs.existsSync(filename)) {
            try {
                data = fs.readFileSync(filename, 'utf8');
                process.stdout.write(data);
                if (i !== process.argv.length - 1) {
                    process.stdout.write(os.EOL);
                }
            } catch (e) {
                console.log("Error: Failed to read file '" + filename + "'");
            }
        }
        else {
            console.log("Error: File '" + filename + "' not found");
        }
    }
}