let http = require('http');
let url = require('url');
let querystring = require('querystring');
let router = require('./routeGzj');
let fs = require('fs');
let path = require('path')
function staticFileHandle (req, res) {
	fs.createReadStream(res);
}
router.get('/serve', function (req, res) {
	res.end(JSON.stringify(req.query));
})
router.post('/serve', function (req, res) {
	console.dir(req.body)
	res.end(JSON.stringify(req.body));
})
http.createServer(function (req, res) {
	// request.headers  打印全部请求头信息--对象形式
	// request.rawHeaders  全部头信息--数组形式
	// request.httpVersion  请求的协议方式
	// request.method  请求的方式
	// request.url  请求的路径
	console.log(req.headers['content-type'])
	let method = req.method.toLocaleLowerCase();
	let {query, pathname} = url.parse(req.url, true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	if (method === 'get' && pathname.endsWith('.html')) {
		fs.createReadStream(path.join(__dirname, pathname)).pipe(res);
		return;
	}
	var posts = [];
	req.on('error', function(error){  
		console.error(error);
	}).on('data', function(chunk){  
		posts.push(chunk);
	}).on('end', function(){  
		if (method === 'post') {
			let postStr = Buffer.concat(posts).toString();
			if (req.headers['content-type'].includes('json')) {
				req.body = JSON.parse(postStr);
			} else {
				req.body = querystring.parse(postStr);
			}
		}
		req.query = query;
		router.handler(method + pathname, req, res)
	});
	
}).listen(3000, function () {
	console.log('run 3000 port')
})