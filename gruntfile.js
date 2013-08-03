var os = require('os');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      webBrowser: {
        src: [ 
          './bin/<%= pkg.name %>-<%= pkg.version %>.js', 
          './bin/<%= pkg.name %>-<%= pkg.version %>.min.js' 
        ]
      }
    },
    concat: {
      webBrowser: {
        options: {
          separator: os.EOL + os.EOL,
          banner: "'use strict';" + os.EOL + os.EOL 
            + "var class4js = (function (global) {" + os.EOL + os.EOL 
            + "var exports = {};" + os.EOL + os.EOL
            + "exports.version = '<%= pkg.version %>';" + os.EOL + os.EOL,
          footer: "return exports;" + os.EOL + os.EOL
            + "} (typeof global !== 'undefined' ? global : window));" + os.EOL + os.EOL
            + "if (typeof module !== 'undefined' && module !== null) {" + os.EOL
            + "  module.exports = class4js;" + os.EOL
            + "}"
        },
        src: [
          "./src/Compatability.js",
          "./src/TypeException.js",
          "./src/Namespace.js",
          "./src/TypeBuilder.js",
          "./src/TypeExtension.js",
          "./src/Class.js",
          "./src/Interface.js",
          "./src/ObjectFactory.js",
          "./src/Enum.js",
          "./src/IInterceptor.js",
          "./src/InvocationType.js",
          "./src/Invocation.js",
          "./src/IInterceptor.js",
          "./src/Proxy.js",
          "./src/ModuleException.js",
          "./src/ModuleConfiguration.js",
          "./src/Configuration.js",
          "./src/Module.js",
          "./src/IDisposable.js",
          "./src/EventException.js",
          "./src/IEventTarget.js",
          "./src/IEvent.js",
          "./src/Event.js",
          "./src/IEventListener.js",
          "./src/EventDispatcher.js"
        ],
        dest: './bin/<%= pkg.name %>-<%= pkg.version %>.js',
        nonull: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [ 'clean:webBrowser', 'concat:webBrowser' ]);

};