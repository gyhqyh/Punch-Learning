const http = require('http');
const fs = require('fs');
const server = http.createServer(function(req, res) {
    let {url, method} = req;
    console.log(url)
    if (url === '/' && method === 'GET') {
        fs.readFileSync('test.html', function (err, data) {
                res.writeHead(200, {
                    "Content-Type": 'text/html'
                })
                res.end(data);
        })
    } else if (url === '/user' && method === 'GET') {
        res.writeHead(200, {
            "Content-Type": 'application/json'
        })
        res.end(JSON.stringify({loading: true}));
    }
 })
server.listen(8080, function() {
    console.log('服务启动了 ')
});