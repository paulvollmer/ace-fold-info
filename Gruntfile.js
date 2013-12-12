module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['src/*.js'],
        dest: 'javascripts/<%= pkg.name %>.js'
      }
    },

    watch: {
      files: ['src/*.js'],
      tasks: ['concat']
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'ace-builds/src-noconflict/',
            src: ['**'],
            dest: 'javascripts/ace'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('copy_ace_build', ['copy']);
  grunt.registerTask('default', ['concat']);

};
