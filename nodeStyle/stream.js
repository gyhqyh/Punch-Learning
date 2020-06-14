const fs = require('fs')
const rs = fs.createReadStream('./test.html');
const ws = fs.createWriteStream('./test2.html');
rs.pipe(ws);