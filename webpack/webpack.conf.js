let {resolve} = require('path')
const HtmlWbpckPlugin = require('html-webpack-pulgin');
const MiniCssExtractPlug = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
modules.exports = {

    entry: './src/index.js',
    output: {
        // hash 为了解决缓存问题，
        filename: 'js/build.[hash:8].js',
        path: resolve(__dirname, 'build')
    },
    moudle: {
        rules: [
            {
                /*
                eslint-loader eslint
                规则：pack.json eslintConfig
                    "eslintConfig": {
                        "extends": "airbnb-base"
                    }
                airbnb -> eslint-config-airbnb-base eslint-plugin-import eslint
    
                */
                test: /\.js$/,
                loader: eslint-loader,
                exclude: /node_modules/,
                options: {
                    // 自动修复eslint错误
                    fix: true
    
                }
            },
            {
                // 当一个文件需要loader处理是， oneOf配置可以让某个loader处理完。剩下的loader就不处理了
                // 注意：不能有两个loader处理同一个文件，js的处理
                //      提取 把eslint提取出去
                
                oneOf: [
                    
                    {
                        /*
                        兼容：
                        babel-loader @babel/preset-env babel @babel/core
                        1. @babel/preset-env
                            只能转换基本语法，不能处理高级语法如：promise
                        2. @babel/polyfill （高级处理）
                            使用：index.js import 'babel/polyfill'
                            问题：所有有兼容性的问题全解决， 问题导致代码体积太大
                        3. 按需加载 code-js
                            使用、配置：
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js的版本
                                corejs: {version: 3},
                                // 指定兼容哪个版本的浏览器
                                targets: {chrome: '60', fixfog: '60', ie: '9', safari: '10'，edge: '17'}
                            }
                        4. 注意2、3不兼容， 2与3是用来扩展 1的不足
                        */
                       /*
                       开启babel缓存：类似hmr
                       */
                        test: /\.js$/,
                        loader: eslint-loader,
                        exclude: /node_modules/,
                        options: {
                            // 自动修复eslint错误
                            presets: [
                                '@babel/preset-env',
                                // 3. 按需加载 code-js
                                {
                                    // 按需加载
                                    useBuiltIns: 'usage',
                                    // 指定core-js的版本
                                    corejs: {version: 3},
                                    // 指定兼容哪个版本的浏览器
                                    targets: {chrome: '60', fixfog: '60', ie: '9', safari: '10', edge: '17'}
                                }
                            ],
                            // 开启babel缓存，第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.css$/,
                       // use: ['style-loader', 'css-loader']
                       // 提取js中的css为单独文件
                       use: [MiniCssExtractPlug.loader, 'css-loader', {
                           loader: postcss-loader,
                           options: {
                               ident: 'postcss',
                               // 去找pack.json 找browserslist
                               /*
                               "browserslist": {
                                   // 开发环境 -> process.env.NODE_ENV = 'devolopment'
                                   "devolopment": [
                                       "last 1 chrome version",
                                       "last 1 firefox version",
                                       "last 1 safari version"
                                   ],
                                   // 生产环境 默认找生产环境 
                                   "production": [
                                       ">0.2%",
                                       "not dead",
                                       "not op_mini all"
                                   ]
                               }
                               */
                               plugins: () => {
                                   require('postcss-preset-env')()
                               }
                           }
                       }]
                    },
                    {
                        test: /\.less$/,
                       // use: ['style-loader', 'css-loader', 'less-loader']
                       use: [MiniCssExtractPlug.loader, 'css-loader', 'less-loader']
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            limit: 8 * 1024,
                            outputPath: 'imgs',
                            esModules: false
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.woff2?$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new HtmlWbpckPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments:true
            }
        }),
        // hash 为了缓存，为了服务器更新完成后，用户刷新可以看到最新的文件
        new MiniCssExtractPlug({
            filename: 'css/build.[hash].css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // js压缩 production
    mode: 'devolopment',
    devServe: {
        contentBase: resolve(__dirname, 'build'),
        port: 8080,
        open: true,
        // 开启hmr功能
        // hot: true,
        compress: true
    },
    // 代码调试
    devtool: 'source-map'
}
/**
 代码分割
    
 * /
/*
tree shake
    作用：去除业务程序中没有使用的代码（js css)
        前提：1.es6 module 2.production（mode）
    在package.json 中配置 - "sideEffects": false - 所有代码都没有副作用（都可以tree shake）
                            "sideEffects": ["*.css"] - 避免被tree shake干掉css文件
*/
/*
缓存：
    babel缓存
        cacheDirectory: true
        第二次打包更快
    文件资源缓存
        上线代码性能优化
        hash 每次webpack都会生成一个唯一hash，如果某个文件改动，热更新，导致所有缓存失效
        chunkhash 你打包来自同一个chunk，那么hash值就一样
        contenthash 根据文件内容生成hash，不同文件hash一定不同

*/
/*
hmr: hot module replacement
作用： 一个魔铠发生变化，只打包变化模块
    css：style-loader，内部实现了hmr
    js：默认没有hmr功能,注意只能处理非入口js文件
        修改js代码：
            if (module.hot) {
                // 对xx.js 加监视，该文件变化，其他模块不打包
                module.hot.accept('./xx.js', function () {
                    // 希望该文件执行的函数
                    xxx();
                })

            }
    HTML：默认没有hmr功能，html会出现一个问题不会出现热更新了
        解决热更新： entry: ['./index.js', './src/index.html'],但是还是没有hmr
*/
/*
source-map：源代码到构建后代码的映射技术，如果构建后代码出错了。
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    source-map：外部 能提示源代码错误位置，及错误的准确信息
    inline-source-map:内联 构建速度快 只生成一个source-map
    cheap-source-map： 外部，只能精确到行
    nosources-source-map： 
    hidden-source-map： 外部 有文件 ； 不能提示源代码错误位置，能提示构建后代码的错误位置，能错误的准确信息
    eval-source-map：内联 每个文件都生成source-map； 能提示源代码错误位置，及错误的准确信息
生产环境：源代码隐藏？调试不要友好
    内联代码体积大，
    source-map、cheap-module-source-map      

开发环境： 速度快，调试友好
    速度快        
        eval》inline》cheap
        eval-cheap-souce-map
    调试友好   
        source-mp    
        cheap-module-source-mp
        cheap-source-mp
    eval-souce-map 、 eval-cheap-souce-map
*/