// 特点：非阻塞io，事件驱动
// 与前端不同 js语法不变，前端bom dom， 后端fs，http，buffer event os
// 重构 不影响代码功能的情况下，对变量名之类的修改*（优化）
const os = require('os');
const menu = os.freemem / os.totalmem;
console.log(`内存占用率：${menu.toFixed(2)}`);



const doload =  async function (repo, desc) {
    const {promisify} = require('util')
    const download = promisify(require('doload-git-repo'));
    const ora = require('ora');
    const process = ora(`正在下载....${repo}`)
    process.start();
    try {
        await download(repo, desc)
    } catch (e) {
        process.fail();
    }
    process.succeed();
}
const fs = require('fs');
const data = fs.readFileSync('./test.js');
console.log(data)
console.log(data.toString())
fs.readFile('./test.js', function(err, data) {
    if (err) {
        console.log(`错误： ${err.message}`);
        throw err;
    }
    console.log(data, 2)
})
