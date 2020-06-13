let os = require('os');
const mem = os.freemem / os.totalmem;
console.log(`内存占用率  ${mem.toFixed(2)}`, 99)

console.log('2 ---------------------- 2')
let gitAdress = 'git:xxx'
let desc = '../'
let doload = require('doload-git-repo');
let ora = require('ora');
const process = ora(`正在下载...... ${gitAdress}`);
process.start();
doload(gitAdress, desc, function (err) {
    if (err) {
        process.fail();
    } else {
        process.succeed();
    }
})
