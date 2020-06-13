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
    mode: 'production'
}