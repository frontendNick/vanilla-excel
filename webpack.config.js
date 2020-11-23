const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production'    //  должно быть true
const isDev = !isProd                                   //  отрицание, равенство в false

console.log('IS PROD:', isProd)
console.log('IS DEV:', isDev)

module.exports = {
    context: path.resolve('./src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve('./dist'),
    },
    resolve: {
        extensions: ['.js'],
        //  just like import '../../../sdsd.js
        //  will be @...
        alias: {
            '@': path.resolve('./src'),
            '@core': path.resolve('./src/core')
        }
    },
    plugins: [
        new CleanWebpackPlugin,
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                removeWhitespaces: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
            {
              from: path.resolve('./src/favicon.svg'),
              to: path.resolve('./dist')
            },
            ],
          }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ]
    }
}
