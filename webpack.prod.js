const merge = require( 'webpack-merge' );
const AssetsPlugin = require( 'assets-webpack-plugin' );
const path = require( 'path' );
const common = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const wpi18nExtractor = require( './bin/i18n-map-extractor.js' );
common.forEach( ( config, index ) => {
	if ( common[ index ].configName === 'base' ) {
		common[ index ].plugins = [
			new CleanWebpackPlugin( [ 'assets/dist' ] ),
			new webpack.ProvidePlugin( {
				'React': 'react', // eslint-disable-line quote-props
			} ),
			new ExtractTextPlugin( 'ee-[name].[contenthash].dist.css' ),
			new webpack.HashedModuleIdsPlugin(),
			new webpack.optimize.CommonsChunkPlugin( {
				name: 'reactVendor',
				minChunks: Infinity,
			} ),
			new webpack.optimize.CommonsChunkPlugin( {
				name: 'manifest',
				minChunks: Infinity,
			} ),
		];
	}
	if ( common[ index ].configName === 'eejs' ) {
		common[ index ].plugins = [
			new wpi18nExtractor( {
				aliases: {
					eejs: 'eejs-core',
				},
			} ),
		];
	}
	common[ index ] = merge( config, {
		plugins: [
			new webpack.DefinePlugin( {
				'process.env': {
					NODE_ENV: JSON.stringify( 'production' ),
				},
			} ),
			new wpi18nExtractor( {
				aliases: {
					'wp-plugins-page': 'ee-wp-plugins-page',
				},
			} ),
			new webpack.optimize.UglifyJsPlugin( {
				sourceMap: true,
				output: {
					comments: false,
				},
			} ),
			new AssetsPlugin( {
				filename: 'build-manifest.json',
				path: path.resolve( __dirname, 'assets/dist' ),
				update: true,
			} ),
		],
	} );
	//delete temporary named config item so no config errors
	delete common[ index ].configName;
} );
module.exports = common;
