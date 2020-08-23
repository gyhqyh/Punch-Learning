let http = require('http');
let fs = require('fs');
let urlParse = require('url')

http
  .createServer(function(req, res) {
        /*
        中间件 就是请求进来后执行了若干的函数，
        每个函数实现了一个功能，（比如解析query字符串为对象，并把结果挂载到req上）
        经过若干个中间件后， （函数、面向切面编程）
        才开始处理请求
        */   
       let {url} = req;
        // url 模块解析url， 第二个参数为true，可以把query转换为对象
        // pathname 不包含查询字符串部分
       let {query, pathname} = urlParse.parse(url, true);
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
       } else if (url.indexOf('/static')) {
            fs.readFile(`./${url}`, function (err, data) {
                if (err) {
                    return res.end('404 ')
                }
                res.end(data)
            })
       } else if (pathname === 'testGet') {
            console.log('query 对象', query);
            res.setHeader('Content-Type', 'text/plain; chartset: utf-8')
            res.end('成功了， 接收了')
       } else {
            res.end('404 ')
       }
  })
  .listen(3000, function () {
      console.log('run ...')
  })
/*
1.如何通过服务器让客户端重定向
    状态码设置302 status: 302 暂时重定向;
        statusCode
    在响应头中通过Location字段告诉客户端往哪里重定向
        setHeader
 如果客户端发现收到服务器的响应的状态码是 302，就会自动去响应头中找 Location
 所以就能看到客户端自动跳转了
2.客户端的跳转用的是 a 标签、location对象
    状态码设置302 status: 302 暂时重定向;
*/
/*
测试node api，
在terminal中输入node  就进入了node环境
退出 ctrl + c 两次
cls 清屏
*/
/*
http 是无状态的
老师发苹果
领过的在学生胸前贴个标签，领过了
下次 学生再来找老师，就能看见标签了， 就知道你领过了

cookie 的原理
但是cookie不能保存敏感信息，
sesson
商场的储物柜
把敏感的信息存储进入服务端， 给前端发票（cookie）
前端来的时候会带着这个票， 服务端取一下就可以了
*/