const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const common = require( './webpack.common.js' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const miniExtract = require( 'mini-css-extract-plugin' );
const assetsData = Object.create( null );
common.forEach( ( config, index ) => {
	if ( common[ index ].configName === 'base' ) {
		common[ index ].optimization = {
			runtimeChunk: {
				name: 'manifest',
			},
		};
		common[ index ].plugins = [
			new CleanWebpackPlugin( [ 'assets/dist' ] ),
		];
	}
	common[ index ] = merge( config, {
		devtool: 'inline-source-map',
		plugins: [
			new WebpackAssetsManifest( {
				output: path.resolve( __dirname,
					'assets/dist/build-manifest.json',
				),
				assets: assetsData,
			} ),
			new webpack.ProvidePlugin( {
				React: 'react',
			} ),
			new miniExtract( {
				filename: 'ee-[name].[contenthash].dist.css',
			} ),
		],
		mode: 'development',
	} );
	//delete temporary named config item so no config errors
	delete common[ index ].configName;
} );
module.exports = common;
