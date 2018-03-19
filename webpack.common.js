const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const assets = './assets/src/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
/** see below for multiple configurations.
/** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
config = [
    {
        entry: {
            //example
            // 'ee-shortcode-blocks': [
            //     assets + 'blocks/index.js'
            // ],
        },
        plugins: [
            new CleanWebpackPlugin(['assets/dist']),
            new ExtractTextPlugin('[name].style.css')
        ],
        output: {
            filename: '[name].dist.js',
            path: path.resolve(__dirname, 'assets/dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        combineLoaders([{
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[local]'
                            }
                        }])
                    )
                }
            ]
        }
    }
];
module.exports = config;