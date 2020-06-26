const {resolve} = require('path');
const MiniCssWebpackPlugin = require('mini-css-webpack-plugin');
const OptizmizeCssAssetWebpackPlugin = require('optimize-css-asset-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonCssloader = [
    MiniCssWebpackPlugin.loader,
    'css-loader',
    /*
    需要在pack.json中，指示兼容范围
    "browserslist": {
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ],
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]
    }
    */
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => {
                require('postcss-preset-env');
            }
        }
    }
]
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rlues: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                /*
                "eslintConfig": {
                    "extends": "airbnb-base"
                }
                */
               /*
                比babel-loader先执行
               */
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }

            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        {
                            useBuiltIns: 'usage',
                            corejs: {version: '3'},
                            targets: {chrome: '60', firefox: '50'}
                        }
                    ]
                }

            },
            {
                test: /\.css$/,
                use: commonCssloader
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssloader,
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(png|gif|jpg|css|js|html|less)$/,
                loader: 'file-loader',
                optiosns: {
                    outputPath: 'media',
                    name: '[name].[hash:6].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 提取css
        new MiniCssWebpackPlugin({
            filename: 'css/build.css'
        }),
        // 压缩css
        new OptizmizeCssAssetWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production',
    // 打包第三方库 文件到单独的一个chunks（入口是一个chunk，第三方库是一个chunk）
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    externals: {
        // import jquery form "jQuery"
        // 忽略的库名  -- npm包名
        // 此时jquery这个包要通过cdn引入
        jquery: 'jQuery'
    }
}
/*
dll打包: 与externals特别像，不过相当于在本地做了一个cdn。把一些不常变动的库放到dll包里
*/
/*
externals: 忽略的打包对象，比如用cdn引入的库

*/
/*
npm i thread-loader -D
{
    test: /\.js$/,
    exclude: /node_module/,
    use: [
        // 进程启动600ms， 进程通信也是有时间的， 只有工作时间比较长。才会用
        {
            loader: 'thread-loader',
            options: {
                workers: 2
            }
        },
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    "@babel/preset-env",
                    {
                        useBuiltIns: 'usage',
                        corejs: {version: '3'},
                        targets: {chrome: '60', firefox: '50'}
                    }
                ]
            }
        }
    ]
},
*/
/*
懒加载
对计算js文件懒加载: 先进行代码分割（import引入js）， 二把加载代码放入异步的回调函数中当回调函数执行时，才动态加载js文件
栗子： vue router的配置
document.getElementById('btn').onclick = function () {
    import('./test')
        .then(( {add} )=> {
            console.log(add(1, 2))
        })
}
预加载 webpackPrefetch : true 预加载，此时懒加载配置失效，test.js 会被提前加载完成
正常加载 并行加载， 预加载 是在浏览器空闲时，才加载资源，兼容性非常差
document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName: 'test', webpackPrefetch: true *\/'./test')
        .then(( {add} )=> {
            console.log(add(1, 2))
        })
}
*/
/**
 代码分割：减小体积，并行加载，优化加载速度
    1.入口文件
        entry: { 单页面 - 单入口 ； 多页面 - 多入口
            main: './src/index.js',
            test: './src/test.js'
        },
        output: {
            name: 'js/[name].[hsah:8].js,
            path: resolve(__dirname, 'build')
        }
    2. 
    // 单入口：将node_module中的代码单独打包一个chunk
    // 多人口：多页面应用 重复加载。比如jQuery，在两个入口都被引用
        自动分析，多入口是否包含功能的引入文件（要求：共有模块需要大于一定大小，太小不拆分）
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
    3. 通过js代码让某个文件打包到一个单独文件
    improt(/* webpackChunkName: 'test' *斜杠注释./js/test')
        .then(({add}) => {
            console.log(add(2, 5))
        })
        .catch(() => {
            console.log('文件导入失败')
        })

 */