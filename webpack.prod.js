const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const path = require( 'path' );
const common = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const miniExtract = require( 'mini-css-extract-plugin' );
const wpi18nExtractor = require( './bin/i18n-map-extractor.js' );
const assetsData = Object.create( null );
const DependencyExtractionWebpackPlugin = require(
	'@wordpress/dependency-extraction-webpack-plugin'
);
const { requestToExternal, requestToHandle } = require(
	'./bin/asset-dependency-maps'
);
const pluginsConfigWithExtraction = [
	new webpack.DefinePlugin( {
		'process.env': {
			NODE_ENV: JSON.stringify( 'production' ),
		},
	} ),
	new wpi18nExtractor( {
		aliases: {
			'wp-plugins-page': 'ee-wp-plugins-page',
			'data-stores': 'eventespresso-data-stores',
			components: 'eventespresso-components',
			helpers: 'eventespresso-helpers',
			valueObjects: 'eventespresso-value-objects',
			hocs: 'eventespresso-hocs',
			model: 'eventespresso-model',
			validators: 'eventespresso-validators',
			'editor-hocs': 'eventespresso-editor-hocs',
		},
		excludes: [ 'eejs', 'vendor', 'core-default-theme' ],
	} ),
	new webpack.ProvidePlugin( {
		React: 'react',
	} ),
	new DependencyExtractionWebpackPlugin( {
		requestToExternal,
		requestToHandle,
	} ),
	new WebpackAssetsManifest( {
		output: path.resolve( __dirname,
			'assets/dist/build-manifest.json',
		),
		assets: assetsData,
	} ),
	new miniExtract( {
		filename: '[name].[contenthash].dist.css',
	} ),
];
const pluginsConfigWithoutExtraction = [
	new webpack.DefinePlugin( {
		'process.env': {
			NODE_ENV: JSON.stringify( 'production' ),
		},
	} ),
	new wpi18nExtractor( {
		aliases: {
			'wp-plugins-page': 'ee-wp-plugins-page',
			'data-stores': 'eventespresso-data-stores',
			components: 'eventespresso-components',
			helpers: 'eventespresso-helpers',
			valueObjects: 'eventespresso-value-objects',
			hocs: 'eventespresso-hocs',
			model: 'eventespresso-model',
			validators: 'eventespresso-validators',
			'editor-hocs': 'eventespresso-editor-hocs',
		},
		excludes: [ 'eejs', 'vendor', 'core-default-theme' ],
	} ),
	new webpack.ProvidePlugin( {
		React: 'react',
	} ),
	new WebpackAssetsManifest( {
		output: path.resolve( __dirname,
			'assets/dist/build-manifest.json',
		),
		assets: assetsData,
	} ),
	new miniExtract( {
		filename: '[name].[contenthash].dist.css',
	} ),
];
common.forEach( ( config, index ) => {
	const plugins = config.entry[ 'eventespresso-vendor' ] ?
		pluginsConfigWithoutExtraction :
		pluginsConfigWithExtraction;
	common[ index ] = merge( config, {
		plugins,
		mode: 'production',
	} );
} );
module.exports = common;
