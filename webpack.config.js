const path = require('path')
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        //filename: 'bundle.js'
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        //compress: true,
        port: 1234,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                // use: [
                //     MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'
                // ]
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.jpeg/,
                type: 'asset/resource'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './images/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            //filename: 'main.css'
            filename: 'main.css'
        }),
        //new webpack.HotModuleReplacementPlugin(),
    ],
    //警告 webpack 的性能提示
    performance: {
        hints: 'warning',
        //入口起點的最大體積
        maxEntrypointSize: 50000000,
        //生成檔案的最大體積
        maxAssetSize: 30000000,
        //隻給出 js 檔案的性能提示
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },

}