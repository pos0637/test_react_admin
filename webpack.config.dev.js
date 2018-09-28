const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = './dist/';

module.exports = {
    entry: [
        "@babel/polyfill",
        path.resolve(__dirname, './src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html')
        }),
        new CleanWebpackPlugin([outputPath])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, outputPath),
        host: 'localhost',
        port: 8000
    },
    devtool: 'cheap-module-eval-source-map'
};
