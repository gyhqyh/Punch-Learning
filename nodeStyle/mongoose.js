let mongoose = require('mongoose');

// 设计模型，保证个别字段的类型 长度 非空（就是限制）
let Schema = mongoose.Schema;

// 连接数据库，有连接没有创建
mongoose.connect('mongodb://localhost/gzj');

// 设计集合结果。 字段名称为表结构的名称，值为
// 约束的目的是为了数据的完整性，不要有脏数据
let userSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String
    }
})

// 将一个架构发布为模型（集合名称 Users），返回值为模型构造函数
let User = mongoose.model("User", userSchema)

// 当我们有模型构造函数 就可以对集合 Users，做操作了

// 新增
let aUser = new User({
    username: 'gzj',
    password: 'gzj',
    email: '1'
})
aUser.save(function (err, ret) {
    if (err) {
        console.log('bao cun shi bai')
    } else {
        console.log('bao cun cheng gong')
    }
})

// 查询
User.findOne(function (err, data) {
    if (err) {
        console.log('shi bai')
    } else {
        console.log(data)
    }
})
User.find(function (err, data) {
    if (err) {
        console.log('shi bai')
    } else {
        console.log(data)
    }
})
User.find({username: 'zhangsan'}, function (err, data) {
    if (err) {
        console.log('shi bai')
    } else {
        console.log(data)
    }
})
