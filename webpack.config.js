var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var ip = require('ip');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    // 定义主入口从 src 下开始找
    context: path.join(__dirname, './src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "sass-loader"]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'vue-html-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                use: ['url-loader?limit=4096&name=[path][name].[ext]?[hash:7]']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: "file-loader",
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                include: [path.join(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')//错误输出格式
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.vue', '.js'],
        alias: {
            'src': path.join(__dirname, './src'),
            'css': path.join(__dirname, './src/css'),
            'assets': path.join(__dirname, './src/assets'),
            'components': path.join(__dirname, './src/components'),
            'constants': path.join(__dirname, './src/constants'),
            'directives': path.join(__dirname, './src/directives'),
            'filters': path.join(__dirname, './src/filters'),
            'utils': path.join(__dirname, './src/utils'),
            'services': path.join(__dirname, './src/services'),
            'views': path.join(__dirname, './src/views'),
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true, //允许插件把css和js分别插入head与body
            minify: {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:7].css',
            allChunks: true
        }),
        // 注入webpack运行的环境变量（是否为开发环境）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
        }),
        // 启用作用域提升,让代码文件更小、运行的更快
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 压缩打包后moment的大小，只引入中英文版本
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
        // 按需加载，只压缩用到的方法
        new LodashModuleReplacementPlugin({
            'shorthands': true
        })
    ],
    devServer: {
        // 本地环境主入口为 /src/index.html
        contentBase: './src',
        //支持H5 History Mode模式，开启后刷新页面不会跳转404
        historyApiFallback: true,
        noInfo: true,
        host: ip.address(),
        port: 8000,
        proxy: {
            '/mock': {
                target: 'http://localhost:9000'
            },
            changeOrigin: true
        },
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (isProd) {
    config.devtool = '#source-map';
    //把vue中内联的css拆出来，以外联引用
    config.module.rules[0].options = {
        loaders: {
            sass: ExtractTextPlugin.extract({
                use: ['css-loader','sass-loader'],
                fallback: 'vue-style-loader'
            }),
        }
    };

    // http://vue-loader.vuejs.org/en/workflow/production.html
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/assets'),
                to: path.join(__dirname, 'dist/assets')
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                // 去除vue和js中的console.*函数
                drop_console: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // optimize module ids by occurrence count
        new webpack.optimize.OccurrenceOrderPlugin()
    ]);
}

if (!isProd) {
    // mock server startup
    var db = require('./mock/db.js');
    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router(db);
    var middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use('/mock', router);
    server.listen(9000, function() {
        console.log('Mock API Server is running!')
    });
}

module.exports = config;
