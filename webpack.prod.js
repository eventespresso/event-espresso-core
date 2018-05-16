const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const path = require( 'path' );
const common = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const miniExtract = require( 'mini-css-extract-plugin' );
const wpi18nExtractor = require( './bin/i18n-map-extractor.js' );
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
			new WebpackAssetsManifest( {
				output: path.resolve( __dirname,
					'assets/dist/build-manifest.json',
				),
				merge: true,
				entrypoints: true,
			} ),
		],
		mode: 'production',
	} );
	//delete temporary named config item so no config errors
	delete common[ index ].configName;
} );
module.exports = common;
