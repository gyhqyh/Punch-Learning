// 使用dll技术对第三方库打包
const {resolve} = require('path');
const webpack = require('webpack')
module.exports = {
    entry: {
        // 最终生成包[name] --> jquery
        // ["jquery"] --> 要打包的库是jquery
        jquery: ["jquery"]
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        // 这个库向外暴露的变量名称，我们打包库里面像外暴露的内容叫什么名字
        library: '[name]_[hash:8]',
    },
    plugins: [
        // 作用打包生成一个manifest.json 文件 -->  提供和jquery的映射
        new webpack.DllPlugin({
            // 映射库暴露出去的内容名称
            name: '[name]_[hash:8]',
            // 输出文件名称及路径
            path: resolve(__dirname, 'dll/manifest.json') 
        })
    ]
}