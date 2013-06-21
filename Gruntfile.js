module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: "/**!\n" +
                        "* <%= pkg.name %> Framework\n" +
                        "* @version <%= pkg.version %>\n" +
                        "* @license MIT-License <https://raw.github.com/Fluidbyte/ColtJS/master/LICENSE>\n" +
                        "* Copyright (c) <%= grunt.template.today('yyyy') %>)\n" +
                        "**/\n"
            },
            build: {
                src: "src/colt.js",
                dest: "build/colt.min.js"
            }
        },
        jshint: {
            options: {
                "curly": true,
                "expr": true,
                "newcap": false,
                "quotmark": "double",
                "regexdash": true,
                "trailing": false,
                "undef": true,
                "unused": true,
                "maxerr": 100,

                "eqnull": true,
                "evil": true,
                "sub": true,

                "browser": true,
                "wsh": true,
                "devel": true,
                "jquery": true,

                "predef": [
                    "require",
                    "define",
                    "module"
                ]
            },
            all: ["Gruntfile.js", "src/*.js"]
        }
      });

      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks("grunt-contrib-uglify");
      // Load the plugin that provides the "jshint" task.
      grunt.loadNpmTasks("grunt-contrib-jshint");

      // Default task(s).
      grunt.registerTask("default", ["jshint", "uglify"]);

};
