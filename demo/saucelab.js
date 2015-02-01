var session = require('../')()

//name: 'internet explorer', version: '8', platform: 'Windows 2003'

session.init({
	/*
	browser: {
		name: 'internet explorer',
		version: '8',
		platform: 'Windows XP'
	},*/
	browser: {
		name: 'iPhone',
		version: '8.1'
	},
	sauceLabs: true
}, function(err, value) {
	console.log(err, value)
	session.exec('timeouts/async_script', {
		body: {ms: 1000}
	}, function(err, value) {
		console.log(err, value)
		session.exec('execute_async', {
			body: {
				script: 'arguments[arguments.length - 1](1024)',
				args: []
			}
		}, function(err, value) {
			console.log(err, value)
			session.exit(function(err) {
				console.log('exit', err)
			})
		})
	})
})
