var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var pathToJquery = path.resolve(node_modules, 'jquery/dist/jquery.min.js');
var pathToBootstrapValidator = path.resolve(node_modules, 'bootstrap-validator/dist/validator.min.js');

function getEntrySources() {
    var sources = [];

    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack/hot/dev-server');
    }
    sources.push(path.resolve(__dirname, 'app/index.js'));

    return sources;
}

config = {
    entry: getEntrySources(),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            query:
            {
                presets:['es2015','react']
            }
        },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(png|jpg)$/, loader: 'file-loader?name=img/[name].[ext]' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
        ],
        noParse: [pathToReact]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/public/index.html'
        }),
        new ExtractTextPlugin('app.css')
    ],
    resolve: {
        modulesDirectories: ["node_modules"],
        alias: {
            'react': pathToReact,
            'react-dom': pathToReactDOM,
            'jquery': pathToJquery,
            'validator': pathToBootstrapValidator
        }
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    devServer: {
        historyApiFallback: true
    }
};

module.exports = config;
