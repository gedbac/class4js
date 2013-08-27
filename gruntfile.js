'use strict';

module.exports = function (grunt) {

  var os = require('os');
  var path = require('path');

  var src = [
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
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      'browser-prod': {
        src: [
          './bin/<%= pkg.name %>-<%= pkg.version %>.js',
          './bin/<%= pkg.name %>-<%= pkg.version %>.min.js'
        ]
      },
      'node-prod': {
        src: [
          './lib/<%= pkg.name %>.js'
        ]
      }
    },
    concat: {
      'browser-prod': {
        options: {
          separator: os.EOL + os.EOL,
          banner: "var class4js = (function (global) {" + os.EOL + os.EOL +
            "  'use strict';" + os.EOL + os.EOL +
            "  var exports = {};" + os.EOL + os.EOL +
            "  exports.version = '<%= pkg.version %>';" + os.EOL + os.EOL,
          footer: os.EOL + os.EOL + "  return exports;" + os.EOL + os.EOL +
            "} (typeof global !== 'undefined' ? global : window));" + os.EOL + os.EOL +
            "if (typeof module !== 'undefined' && module !== null) {" + os.EOL +
            "  module.exports = class4js;" + os.EOL +
            "}",
          process: function (src, filepath) {
            var lines = src.split(os.EOL);
            for (var i = 0; i < lines.length; i++) {
              lines[i] = '  ' + lines[i];
            }
            return lines.join(os.EOL);
          }
        },
        src: src,
        dest: './bin/<%= pkg.name %>-<%= pkg.version %>.js',
        nonull: true
      },
      'node-prod': {
        options: {
          separator: os.EOL + os.EOL,
          banner: "var class4js = (function (global) {" + os.EOL + os.EOL +
            "  'use strict';" + os.EOL + os.EOL +
            "  var exports = {};" + os.EOL + os.EOL +
            "  exports.version = '<%= pkg.version %>';" + os.EOL + os.EOL,
          footer: os.EOL + os.EOL + "  return exports;" + os.EOL + os.EOL +
            "} (typeof global !== 'undefined' ? global : window));" + os.EOL + os.EOL +
            "if (typeof module !== 'undefined' && module !== null) {" + os.EOL +
            "  module.exports = class4js;" + os.EOL +
            "}",
          process: function (src, filepath) {
            var lines = src.split(os.EOL);
            for (var i = 0; i < lines.length; i++) {
              lines[i] = '  ' + lines[i];
            }
            return lines.join(os.EOL);
          }
        },
        src: src,
        dest: './lib/<%= pkg.name %>.js',
        nonull: true
      }
    },
    minify: {
      'browser-prod': {
        src: './bin/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: './bin/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      options: {
        indent: 2,
        curly: true,
        maxlen: 120,
        trailing: true,
        smarttabs: false,
        newcap: false
      },
      'scripts': {
        options: {
          node: true,
          strict: true
        },
        files: {
          src: [
            './tasks/*.js',
            './gruntfile.js'
          ]
        }
      },
      'node-dev': {
        options: {
          node: true,
          strict: false
        },
        files: {
          src: src,
        }
      },
      'node-prod': {
        options: {
          node: true,
          strict: true
        },
        filse: {
          src: [
            './lib/<%= pkg.name %>.js'
          ]
        }
      },
      'browser-dev': {
        options: {
          browser: true,
          strict: false
        },
        files: {
          src: src,
        }
      },
      'browser-prod': {
        options: {
          browser: true,
          strict: true
        },
        files: {
          src: [ './bin/<%= pkg.name %>-<%= pkg.version %>.js' ]
        }
      }
    },
    jasmine: {
      spec: {
        src: './bin/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          specs: './spec/*.js'
        }
      }
    },
    'jasmine-node': {
      options: {
        matchall: true,
        color: true,
        verbose: true
      },
      run: {
        spec: './spec'
      },
      executable: path.join(__dirname, './node_modules/.bin/jasmine-node')
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');

  grunt.registerTask('default', [
    'jshint:scripts',
    'jshint:node-dev',
    'jshint:browser-dev',
    'clean:browser-prod',
    'concat:browser-prod',
    'jshint:browser-prod',
    'minify:browser-prod',
    'clean:node-prod',
    'concat:node-prod',
    'jshint:node-prod',
    'jasmine-node',
    'jasmine:spec'
  ]);

};