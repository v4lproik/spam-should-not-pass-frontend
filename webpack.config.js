var path = require('path');
var webpack = require("webpack");
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var pathToJquery = path.resolve(node_modules, 'jquery/dist/jquery.min.js');

config = {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'app/index.js')
    ],
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        alias: {
            'react': pathToReact,
            'react-dom': pathToReactDOM,
            'jquery': pathToJquery
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            query:
            {
                presets:['es2015','react']
            }
        }],
        noParse: [pathToReact]
    }
};

module.exports = config;