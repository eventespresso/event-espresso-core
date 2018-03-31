const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
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
            new AssetsPlugin({
              filename: 'build-manifest.json',
              path: path.resolve(__dirname, 'assets/dist'),
              update: true
            })
        ]
    })
});
module.exports = common;