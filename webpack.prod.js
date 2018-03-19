const merge = require('webpack-merge');
let common = require('./webpack.common.js');
const webpack = require('webpack');
common.forEach((config, index) => {
    common[index] = merge(config,{
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                output: {
                    comments: false,
                }
            }),
        ]
    })
});
module.exports = common;