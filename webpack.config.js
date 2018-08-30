const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ip = require('ip');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

var config = {
    // 定义主入口从 src 下开始找
    context: path.join(__dirname, './src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: [
                    path.join(__dirname, './src'),
                    path.join(__dirname, './node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.vue', '.js'],
        alias: {
            '@': path.join(__dirname, './src'),
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        // 注入webpack运行的环境变量（是否为开发环境）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
        }),
        new VueLoaderPlugin(),
        // 压缩打包后moment的大小，只引入中英文版本
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
        // 按需加载，只压缩用到的方法
        new LodashModuleReplacementPlugin({
            'shorthands': true
        })
    ],
    performance: {
        hints: false
    }
};

if (isDev) {
    const devServerHost = ip.address();
    const devServerPort = 8000;
    config = merge(config, {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [path.join(__dirname, 'src')],
                    options: {
                        // 错误输出格式
                        formatter: require('eslint-friendly-formatter'),
                        emitWarning: true
                    }
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(scss|sass)$/,
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        // cheap-module-eval-source-map is faster for development
        devtool: 'cheap-source-map',
        devServer: {
            hot: true,
            // 本地环境主入口为 /src/index.html
            contentBase: './src',
            //支持H5 History Mode模式，开启后刷新页面不会跳转404
            // historyApiFallback: true,
            noInfo: true,
            host: devServerHost,
            port: devServerPort,
            proxy: {
                '/mock': {
                    target: 'http://localhost:9000'
                },
                changeOrigin: true
            },
            clientLogLevel: 'warning',
            // compress: true,
            // open: true,
            // quiet: true, // necessary for FriendlyErrorsPlugin
            overlay: { warnings: false, errors: true },
            watchOptions: { poll: false }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                template: './index.html',
                // 允许插件把css和js分别插入head与body
                inject: true
            })
        ]
    });

    console.log(`Your project is running at http://${devServerHost}:${devServerPort}`);

    launchMock();
}

if (isProd) {
    config = merge(config, {
        mode: 'production',
        devtool: 'inline-source-map',
        output: {
            filename: '[name].[chunkhash:8].js',
            chunkFilename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            // extract css into its own file
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].css'
            }),
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                // 允许插件把css和js分别插入head与body
                inject: true,
                minify: {
                    // more options: https://github.com/kangax/html-minifier#options-quick-reference
                    minifyJS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    removeAttributeQuotes: true
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                // `runtime` must same as runtimeChunk name. default is `runtime`
                inline: /runtime\..*\.js$/
            }),
            // keep chunk.id stable when chunk has no name
            new webpack.NamedChunksPlugin(chunk => {
                const seen = new Set();
                const nameLength = 4;
                const modules = Array.from(chunk.modulesIterable);

                if (chunk.name) {
                    return chunk.name;
                }

                if (modules.length > 1) {
                    const hash = require('hash-sum');
                    const joinedHash = hash(modules.map(m => m.id).join('_'));
                    let len = nameLength;
                    while (seen.has(joinedHash.substr(0, len))) {
                        len++;
                    }
                    seen.add(joinedHash.substr(0, len));

                    return `chunk-${joinedHash.substr(0, len)}`;
                } else {
                    return modules[0].id;
                }
            }),
            // keep module.id stable when vender modules does not change
            new webpack.HashedModuleIdsPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'src/assets'),
                    to: path.join(__dirname, 'dist/assets')
                }
            ])
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // 只打包初始时依赖的第三方
                    },
                    mintUI: {
                        name: 'chunk-mintUI', // 单独将 mintUI 拆包
                        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]mint-ui[\\/]/
                    },
                    commons: {
                        name: 'chunk-comomns',
                        test: path.join(__dirname, 'src/components'), // 可自定义拓展你的规则
                        minChunks: 3, // 最小公用次数
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: 'single',
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        mangle: {
                            safari10: true
                        }
                    },
                    sourceMap: false,
                    cache: true,
                    parallel: true
                }),
                // Compress extracted CSS. We are using this plugin so that possible
                // duplicated CSS from different components can be deduped.
                new OptimizeCSSAssetsPlugin()
            ]
        }
    },
    {
        stats: {
            colors: true,
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    });
}

function launchMock () {
    // mock server startup
    var db = require('./mock/db.js');
    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router(db);
    var middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use('/mock', router);
    server.listen(9000, () => {
        console.log('Mock API Server is running!');
    });
}

module.exports = config;
