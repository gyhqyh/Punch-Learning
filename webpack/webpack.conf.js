let {resolve} = require('path')
const HtmlWbpckPlugin = require('html-webpack-pulgin');
const MiniCssExtractPlug = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
modules.exports = {

    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    moudle: {
        rules:[
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
                /*
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
                    ]

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
        new MiniCssExtractPlug({
            filename: 'css/build.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // js压缩 production
    mode: 'devolopment',
    devServe: {
        contentBase: resolve(__dirname, 'build'),
        port: 8080,
        open: true,
        compress: true
    }
}