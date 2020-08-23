// node 封装异步api
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.json');

/*
    文件写入的封装
*/
function fsWriteFile (data, cb) {
    fs.writeFile(dbPath, data, function(err) {
        if (err) {
            return cb(err);
        }
        cb(null)
    })
}

/*
    查找
*/
exports.find = function (cb) {
    // 不传可选参数 utf8，data读取的是Buffer 数组， 添加完了之后data 相当 Buffer.toString()
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return cb(err, null)
        }
        cb(null, JSON.parse(data))
    })
}

/*
    查找
*/
exports.findOne = function (id, cb) {
    // 不传可选参数 utf8，data读取的是Buffer 数组， 添加完了之后data 相当 Buffer.toString()
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return cb(err, null)
        }
        let result = JSON.parse(data).find(item => {
            return item.id === Number.parseInt(id);
        })
        cb(null, result)
    })
}

/*
    增加
*/
exports.save = function (obj, cb) {
    // 不传可选参数 utf8，data读取的是Buffer 数组， 添加完了之后data 相当 Buffer.toString()
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return cb(err)
        }
        let arr = JSON.parse(data);
        obj.id = Date.now + (Math.random() + '').slice(2, 8);
        arr.push(obj);
        fsWriteFile(JSON.stringify(arr), cb);
    })
}

/*
    updateById
    问题 id 有可能把类型给变了
    ts 确实可以方便维护避免项目 
*/
exports.updateById = function (obj, cb) {
    // 不传可选参数 utf8，data读取的是Buffer 数组， 添加完了之后data 相当 Buffer.toString()
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return cb(err)
        }
        let result = JSON.parse(data);
        let targetItem = result.find(({id}) => {
            return id === Number.parseInt(obj.id);
        });
        /*
            updateById
            问题 id 有可能把类型给变了
            ts 确实可以方便维护避免项目 
        */
        obj.id = Numver.parseInt(obj.id)
        // Object.assign(targetItem, obj)
        for(let i in obj) {
            targetItem[i] = obj[i]
        }
       fsWriteFile(JSON.stringify(result), cb)
    })
}

/*
    delete
*/
exports.delete = function (delId, cb) {
    // 不传可选参数 utf8，data读取的是Buffer 数组， 添加完了之后data 相当 Buffer.toString()
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return cb(err)
        }
        let result = JSON.parse(data);
        let targetIndex = result.findIndex(function ({id}) {
            return delId === id;
        })
        result.splice(targetIndex, 1);
        fsWriteFile(JSON.stringify(result), cb);
    })
}
/*
let db = require('./fileCRUD.js')
router.psot('/edit', function (req, res) {
    let obj = req.body;
    db.updateById(obj, function (err, data) {
        if (err) {
            return res.status(500).send('server error');
        }
        res.redirect('/list')
    })
})
router.psot('/delete', function (req, res) {
    let id = req.query.id;
    db.delete(id, function (err) {
        if (err) {
            return res.status(500).send('server error');
        }
        res.redirect('/list')
    })
})
*/