'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		dependencyCheck: {
			files: ['fixture/index.js'],
			options: {
				package: 'fixture'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['dependencyCheck']);

	var match = false;

	grunt.warn = function (str) {
		if (/Dependencies not listed/.test(str)) {
			match = true;
		}
	};

	process.on('exit', function () {
		if (!match) {
			process.exit(1);
		}
	});
};
