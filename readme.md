# grunt-dependency-check

> Checks which modules you have used in your code and then makes sure they are listed as dependencies in your package.json and vice-versa, using [`dependency-check`](https://github.com/maxogden/dependency-check)

*Issues with the output should be reported on the `dependency-check` [issue tracker](https://github.com/maxogden/dependency-check/issues).*


## Install

```
$ npm install --save-dev grunt-dependency-check
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	dependencyCheck: {
		files: ['**/*.js'],           // same as --entry
		options: {
			package: '.',             // module folder path
			missing: true,            // same as --missing
			unused: true,             // same as --unused
			excludeUnusedDev: false,  // same as --no-dev
			ignoreUnused: [],         // same as --ignore-module
			noDefaultEntries: true    // same as --no-default-entries
		}
	}
});

grunt.registerTask('default', ['dependencyCheck']);
```


## Options

See the `dependency-check` [docs](https://github.com/maxogden/dependency-check).

In addition you can supply a `package` option.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
