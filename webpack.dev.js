const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const common = require( './webpack.common.js' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const miniExtract = require( 'mini-css-extract-plugin' );
common.forEach( ( config, index ) => {
	if ( common[ index ].configName === 'base' ) {
		common[ index ].optimization = {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: 'reactVendor',
						name: 'reactVendor',
						chunks: 'all',
					},
				},
			},
			runtimeChunk: {
				name: 'manifest',
			},
		};
		common[ index ].plugins = [
			new CleanWebpackPlugin( [ 'assets/dist' ] ),
			new webpack.ProvidePlugin( {
				'React': 'react', // eslint-disable-line quote-props
			} ),
			new miniExtract( {
				filename: 'ee-[name].[contenthash].dist.css',
			} ),
		];
	}
	common[ index ] = merge( config, {
		devtool: 'inline-source-map',
		plugins: [
			new WebpackAssetsManifest( {
				output: path.resolve( __dirname,
					'assets/dist/build-manifest.json',
				),
				merge: true,
				entrypoints: true,
			} ),
		],
		mode: 'development',
	} );
	//delete temporary named config item so no config errors
	delete common[ index ].configName;
} );
module.exports = common;
