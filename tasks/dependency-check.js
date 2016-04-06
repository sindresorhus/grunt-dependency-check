'use strict';
var path = require('path');
var dependencyCheck = require('dependency-check');

module.exports = function (grunt) {
	grunt.registerMultiTask('dependencyCheck', 'Ensure used dependencies matches with listed ones', function () {
		var done = this.async();
		var opts = this.options({
			package: '.',
			missing: true,
			unused: true,
			excludeUnusedDev: false,
			ignoreUnused: [],
			noDefaultEntries: true
		});

		dependencyCheck({
			entries: this.filesSrc.map(function (el) {
				return path.relative(opts.package, el);
			}),
			path: opts.package,
			noDefaultEntries: opts.noDefaultEntries
		}, function (err, data) {
			if (err) {
				grunt.warn(err);
				done();
				return;
			}

			var res;
			var pkg = data.package;
			var deps = data.used;

			if (opts.unused) {
				res = dependencyCheck.extra(pkg, deps, {
					excludeDev: opts.excludeUnusedDev,
					ignore: opts.ignoreUnused
				});

				if (res.length > 0) {
					grunt.log.error('Packages in package.json not used in your code:', grunt.log.wordlist(res, {color: 'red'}));
				}
			}

			if (opts.missing) {
				res = dependencyCheck.missing(pkg, deps);

				if (res.length > 0) {
					grunt.warn('Dependencies not listed in package.json:', grunt.log.wordlist(res, {color: 'red'}));
				}
			}

			done();
		});
	});
};
