var wd = require('wd')

//var browser = wd.remote('ondemand.saucelabs.com', 80)
var browser = wd.remote('localhost', 8910)

browser.init({browserName: 'chrome'}, function() {
	browser.get('baidu.com', function() {
		browser.eval('location.href', function(err, val) {
			console.log(err, val)
		})
	})
})
