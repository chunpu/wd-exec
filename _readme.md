Usage
---

```js
var session = require('wd-exec')()
session.init(function(err) {
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

Api
---

#### init

- browser, default is none, [more info](https://code.google.com/p/selenium/wiki/DesiredCapabilities)
- host, default is phantomjs default host: "localhost:8910"
- sauceLabs, if true, use "ondemand.saucelabs.com:80" as host, and use name and key in env, `env.SAUCE_USERNAME, env.SAUCE_ACCESS_KEY`

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
