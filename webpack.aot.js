const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const helpers = require('./webpack.helpers');
const ngToolsWebpack = require('@ngtools/webpack');

console.log('@@@@@@@@@ USING PRODUCTION AOT @@@@@@@@@@@@@@@');

module.exports = {

    entry: {
        'vendor': './src/vendor.ts',
        'polyfills': './src//polyfills.ts',
        'rxjsoperators': './src/rxjs-operators.ts',
        'app': './src/bootstrap-aot.ts' // AoT compilation
    },

    output: {
        path: './wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [
                    '@ngtools/webpack'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig-aot.json',
            entryModule: __dirname + '/src/components/app/app.module#AppModule'
        }),
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills', 'rxjsoperators']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './static/images/*.*', to: "assets/", flatten: true }
        ])
    ]
};