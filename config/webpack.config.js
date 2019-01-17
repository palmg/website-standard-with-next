const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {presets: ['@babel/preset-env', '@babel/preset-react']}
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:8]',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../views/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __RunMode: "'Dev'" //Dev, Test, Pro
        }),
        new webpack.NormalModuleReplacementPlugin(
            /\/iconv-loader$/, 'node-noop'
        ),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../views/ext.fileUploader.js'),
            to: path.resolve(__dirname, '../dist/ext.fileUploader.js')
        }, {
            from: path.resolve(__dirname, '../views/ext.jquery.js'),
            to: path.resolve(__dirname, '../dist/ext.jquery.js')
        }, {
            from: path.resolve(__dirname, '../views/ext.jquery.ui.widget.js'),
            to: path.resolve(__dirname, '../dist/ext.jquery.ui.widget.js')
        }, {
            from: path.resolve(__dirname, '../views/ext.jquery.iframe-transport.js'),
            to: path.resolve(__dirname, '../dist/ext.jquery.iframe-transport.js')
        }])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    performance: { //fix the windows OS warning, the issue is local https://stackoverflow.com/questions/41159817/how-to-disable-optimize-warnings-in-webpack-2/41159932
        hints: false
    },
    devServer: {
        disableHostCheck: true
    }
}