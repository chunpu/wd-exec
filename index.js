var request = require('min-request')
var debug = require('debug')('webdriver')
var path = require('path')
var fs = require('fs')

// WebDriver protocol https://code.google.com/p/selenium/wiki/JsonWireProtocol

var phantomHost = 'localhost:8910'
var sauceHost = 'ondemand.saucelabs.com:80'
var basePath = '/wd/hub/session'

function noop() {}

module.exports = exports = Session

function Session() {
	if (!(this instanceof Session)) return new Session
}

var proto = Session.prototype

// host, browser, auth, sauceLabs
proto.init = function(opt, cb) {
	if ('function' == typeof opt) {
		cb = opt
		opt = {}
	} else opt = opt || {}
	cb = cb || noop

	var host = opt.hostname || phantomHost
	var browser = opt.browser || {}

	if (opt.sauceLabs) {
		var env = process.env
		host = sauceHost
		browser.username = opt.username || env.SAUCE_USERNAME
		browser.accessKey = opt.accessKey || env.SAUCE_ACCESS_KEY
	}

	browser.browserName = browser.browserName || opt.browserName || browser.name

	debug('init options, host: %s, browser: %o', host, browser)

	var me = this

	// https://code.google.com/p/selenium/wiki/DesiredCapabilities
	request(host + basePath, {
		body: {
			desiredCapabilities: browser
		}
	}, function(err, res, body) {
		if (err) {
			debug('init error: %o', err)
			return cb(err)
		}
		var json
		try {
			json = JSON.parse(body)
		} catch (e) {
			json = undefined
			debug('init response abnormal: %s', body)
		}
		debug('init: %o', json)
		json = json || {}
		var id = json.sessionId
		if (!id) {
			// mobile saucelabs use location to return session id
			var headers = res.headers
			debug('try headers: %o', headers)
			var url = headers.location
			if (url) {
				var arr = url.split('/')
				var index = arr.indexOf('session')
				if (index > 0) {
					id = arr[index + 1]
				}
			}
		}
		if (!id) return cb(new Error('fail to get session id'))
		if ('string' == typeof id) {
			debug('init id: %s', id)
			me.id = id
			me.rawBrowser = browser
			me.host = host
			var value = json.value || {}
			me.initInfo = value
			me.browser = {
				name: value.browserName,
				version: value.version,
				platform: value.platform
			}
			cb(null, value)
		} else {
			return cb(new Error('init fail'))
		}
	})
}

proto.exec = function(name, opt, cb) {
	var me = this
	cb = cb || noop
	var pathname = path.resolve(basePath, me.id, name)
	opt = opt || {}
	var method = opt.method || 'GET'
	debug('exec: %s %s', method, pathname)
	request(me.host + pathname, opt, function(err, res, body) {
		if (err) return cb(err)
		try {
			body = JSON.parse(body)
		} catch (e) {}
		body = body || {}
		if (null == body.status) {
			// some api has no callback but 204 no content
			return cb(null, body.value)
		}
		if (0 == body.status) {
			// sessionId, status, value
			cb(null, body.value)
		} else {
			cb(new Error(body))
		}
	})
}

proto.exit = function(cb) {
	this.exec('', {
		method: 'DELETE'
	}, cb)
}
