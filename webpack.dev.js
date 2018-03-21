const merge = require('webpack-merge');
let common = require('./webpack.common.js');
common.forEach((config, index) => {
    common[index] = merge(config, {
        devtool:'inline-source-map'
    })
});
module.exports = common;