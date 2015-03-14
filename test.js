var Session = require('./')
var assert = require('assert')
var spawn = require('child_process').spawn

var phantom

before(function(done) {
	spawn('pkill', ['-9', 'phantomjs'])
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

describe('phantom test', function() {
	it('should return eval value', function(done) {
		var session = Session()
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

	it('can open a url', function(done) {
		var session = Session()
		session.init(function(err, val) {
			assert(!err)
			session.open('http://baidu.com', function(err, val) {
				assert(!err)
				session.exec('execute', {
					body: {
						script: 'return location.href',
						args: []
					}
				}, function(err, val) {
					assert(!err)
					assert(/baidu/i.test(val))
					done()
				})
			})
		})
	})
})

describe('saucelabs test using location', function() {
	var session = Session()
	it('should work with mobile browser', function(done) {
		session.init({
			  sauceLabs: true
			, browser: {
				  name: 'iPhone'
				, version: '8.1'
			}
		}, function(err, value) {
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
	after(function(done) {
		session.exit(function(err) {
			assert(!err)
			done()
		})
	})
})


describe('saucelabs test normal', function() {
	var session = Session()
	it('should work with old ie', function(done) {
		session.init({
			  sauceLabs: true
			, browser: {
				  name: 'internet explorer'
				, version: '6'
				, platform: 'Windows XP'
			}
		}, function(err, value) {
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
	after(function(done) {
		session.exit(function(err) {
			assert(!err)
			done()
		})
	})
})
