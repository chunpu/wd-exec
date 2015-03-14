var session = require('../')()

session.init({}, function(err, val) {
	session.open('http://baidu.com', function() {
		session.exec('execute', {
			body: {
				script: 'return location.href',
				args: []
			}
		}, function(err, val) {
			console.log(err, val)
			session.exit(function(err) {
				console.log('exit', err)
			})
		})
	})
})
