wd-exec
===

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/wd-exec.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wd-exec
[downloads-image]: http://img.shields.io/npm/dm/wd-exec.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wd-exec
[david-image]: http://img.shields.io/david/chunpu/wd-exec.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/wd-exec


Tiny Web Driver support selenium webdriver protocol like Phantomjs, sauceLabs

Installation
---

```sh
npm i wd-exec
```

Usage
---

```js
var session = require('wd-exec')()
session.init(function(err, value) {
	session.exec('execute', {
		body: {
			script: 'return 1024',
			args: []
		}
	}, function(err, value) {
		console.log(value)
		// => 1024
		session.exit()
	})
})
```

after init, u may get session info by

- `session.id`
- `session.browser` the exact browser info, e.g.

```js
{
	name: 'phantomjs',
	version: '1.9.8',
	platform: 'linux-unknown-64bit'
}
```

Api
---

#### init

- `browser` default is none, [more info](https://code.google.com/p/selenium/wiki/DesiredCapabilities)
- `host` default is phantomjs's default host: `localhost:8910`
- `sauceLabs` if true, use `ondemand.saucelabs.com:80` as host, and use name and key in env: `env.SAUCE_USERNAME, env.SAUCE_ACCESS_KEY`

```js
session.init({
	browser: {
		name: 'internet explorer',
		version: '8',
		platform: 'WINDOWS'
	},
	host: 'localhost:8910'
}, function(err) {
	// ...
})
```

sauceLabs

```js
session.init({sauceLabs: true}, function(err) {
	// ...
})
```

#### exec

[WebDriver protocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)

put request json in body

```js
session.exec('execute', function() {
	body: {
		script: 'return location',
		args: []
	}
}, function(err) {
	// ...
})
```

#### exit

```js
session.exit(function(err) {
	// ...
})
```


#### open url

```js
session.open('http://www.baidu.com', function(err) {
	// ...
})
```

License
---

[![License][license-image]][license-url]

[travis-image]: https://img.shields.io/travis/chunpu/wd-exec.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunpu/wd-exec
[license-image]: http://img.shields.io/npm/l/wd-exec.svg?style=flat-square
[license-url]: #
