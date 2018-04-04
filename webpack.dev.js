const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
let common = require('./webpack.common.js');
common.forEach((config, index) => {
    common[index] = merge(config, {
        devtool: 'inline-source-map',
        plugins: [
            new AssetsPlugin({
                filename: 'build-manifest.json',
                path: path.resolve(__dirname, 'assets/dist'),
                prettyPrint: true,
                update: true,
            }),
        ],
    });
});
module.exports = common;