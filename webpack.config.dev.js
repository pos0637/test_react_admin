const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = './dist/';
const files = glob.sync('./src/**/entry.js');
const entries = {};
const plugins = [];

files.forEach(file => {
    const name = /src\/(.*)\/entry.js/.exec(file)[1].replace(/\//g, '_');
    entries[name] = [
        '@babel/polyfill',
        file
    ];

    plugins.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, './public/index.html'),
        chunks: [name]
    }));
});

module.exports = {
    entry: Object.assign({}, {
        'index': [
            '@babel/polyfill',
            path.resolve(__dirname, './src/index.js')
        ]
    }, entries),
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
            template: path.resolve(__dirname, './public/index.html'),
            chunks: ['index']
        }),
        new CleanWebpackPlugin([outputPath])
    ].concat(plugins),
    devServer: {
        contentBase: path.resolve(__dirname, outputPath),
        host: 'localhost',
        port: 8000
    },
    devtool: 'cheap-module-eval-source-map'
};
