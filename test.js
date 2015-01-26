var session = require('./')()
var assert = require('assert')
var spawn = require('child_process').spawn

describe('basic test', function() {
	var phantom
	before(function(done) {
		phantom = spawn('phantomjs', ['-w'])
		phantom.stdout.on('data', function(buf) {
			buf = buf + ''
			if (/8910/.test(buf)) {
				done()
			}
		})
		phantom.stderr.on('data', function(buf) {
			console.error(buf + '')
		})
	})
	after(function() {
		spawn('pkill', ['-9', 'phantomjs'])
	})
	it('should return eval value', function(done) {
		session.init(function(err, value) {
			assert(!err)
			var val = 1024
			session.exec('execute', {
				body: {
					script: 'return ' + val,
					args: []
				}
			}, function(err, value) {
				assert(!err)
				assert.equal(value, val)
				done()
			})
		})
	})
})
