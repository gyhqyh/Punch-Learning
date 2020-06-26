let http = require('http');
let fs = require('fs')

http
  .createServer(function(req, res) {
       let {url} = req;
       if (url === '/') {
           fs.readFile('./test.html', function (err, data) {
                if (err) {
                    return res.end('404 ')
                }
                res.end(data)
           })
       } else if (url.indexOf('/static')) {
            fs.readFile(`./${url}`, function (err, data) {
                if (err) {
                    return res.end('404 ')
                }
                res.end(data)
            })
       } else {
            res.end('404 ')
       }
  })
  .listen(3000, function () {
      console.log('run ...')
  })
