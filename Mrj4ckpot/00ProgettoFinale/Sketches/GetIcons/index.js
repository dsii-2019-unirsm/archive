var OAuth = require('oauth')
// `npm install oauth` to satisfy
// website: https://github.com/ciaranj/node-oauth

var KEY = "8c83a19a66a446558e9df87469d3bb09"
var SECRET = "09a89841313e4212b46be40f701e07f3"

var oauth = new OAuth.OAuth(
	'http://api.thenounproject.com',
	'http://api.thenounproject.com',
	KEY,
	SECRET,
	'1.0',
	null,
	'HMAC-SHA1'
)
oauth.get(
	'http://api.thenounproject.com/icon/6324',
	null,
	null,
	function (e, data, res){
		if (e) console.error(e)
		console.log(require('util').inspect(data))
	}
)
