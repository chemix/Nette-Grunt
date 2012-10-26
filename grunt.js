/*global module:false*/
module.exports = function(grunt) {
  // NPM tasks
  grunt.loadNpmTasks('grunt-contrib-mincss');

  // Custom tasks
  grunt.loadTasks('./Bin/cli/');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:project.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        '*/'
    },

    /*
    'nette-replace' : {
      '{$basePath}' : 'www',
      '{$cdnUrl}' : 'www/cdn'
    },
     */

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: [
            'app/templates/@layout.latte',
            ]
    },

  });

  // Default task.
  grunt.registerTask('default', 'usemin-handler concat min mincss');

};
