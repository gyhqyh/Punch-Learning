const http = require('http');
const fs = require('fs');
const request = require('request');
const target = 'http://127.0.0.1/8082'
const server = http.createServer(function (req, res) {
    const {method, url} = req;
    if (['/', '/loagin'].includes(url) && method === 'GET') {
        res.end(fs.createReadStream('./test2.html'))
    } else {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify([])
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.end(body) // 请求成功的处理逻辑
                }
            })
    }

})
server.listen(3000, function () {
    console.log('http://127.0.0.1:3000')
})