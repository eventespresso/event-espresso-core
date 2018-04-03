const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const assets = './assets/src/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');
const externals = {
    jquery: 'jQuery',
    '@eventespresso/eejs': 'eejs',
};
const reactVendorPackages = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'classnames',
    'lodash',
];
/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
config = [
    {
        externals: {
            '@eventespresso/eejs': {
                this: 'eejs',
            },
        },
        entry: {
            eejs: [
                assets + 'eejs/index.js',
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        output: {
            filename: '[name].[chunkhash].dist.js',
            path: path.resolve(__dirname, 'assets/dist'),
            library: ['eejs'],
            libraryTarget: 'this',
        },
    },
    {
        entry: {
            reactVendor: reactVendorPackages,
            //example
            // 'ee-shortcode-blocks': [
            //     assets + 'blocks/index.js'
            // ],
        },
        plugins: [
            new CleanWebpackPlugin(['assets/dist']),
            new ExtractTextPlugin('ee-[name].[contenthash].dist.css'),
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'reactVendor',
                minChunks: Infinity,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
            }),
        ],
        externals,
        output: {
            filename: 'ee-[name].[chunkhash].dist.js',
            path: path.resolve(__dirname, 'assets/dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        combineLoaders([
                            {
                                loader: 'css-loader',
                                query: {
                                    modules: true,
                                    localIdentName: '[local]',
                                },
                                //can't use minimize because cssnano (the
                                // dependency) doesn't parser the browserlist
                                // extension in package.json correctly, there's
                                // a pending update for it but css-loader
                                // doesn't have the latest yet.
                                // options: {
                                //     minimize: true
                                // }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function() {
                                        return [autoprefixer];
                                    },
                                    sourceMap: true,
                                },
                            },
                        ]),
                    ),
                },
            ],
        },
        watchOptions: {
            poll: 1000,
        },
    },
];
module.exports = config;