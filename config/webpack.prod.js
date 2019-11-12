const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const common = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const miniExtract = require( 'mini-css-extract-plugin' );
const wpi18nExtractor = require( './bin/i18n-map-extractor.js' );
const assetsData = Object.create( null );
const DependencyExtractionWebpackPlugin = require(
	'@wordpress/dependency-extraction-webpack-plugin'
);

const { requestToExternal, requestToHandle } = require(
	'./asset-dependency-maps'
);

const { assetsManifestOutputPath } = require( './paths' );

const pluginsConfigWithExtraction = [
	new webpack.DefinePlugin( {
		'process.env': {
			NODE_ENV: JSON.stringify( 'production' ),
		},
	} ),
	new wpi18nExtractor( {
		excludes: [
			'eejs-core',
			'eventespresso-vendor',
			'eventespresso-core-css-default',
		],
	} ),
	new webpack.ProvidePlugin( {
		React: 'react',
	} ),
	new DependencyExtractionWebpackPlugin( {
		requestToExternal,
		requestToHandle,
	} ),
	new WebpackAssetsManifest( {
		output: assetsManifestOutputPath,
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
		excludes: [
			'eejs-core',
			'eventespresso-vendor',
			'eventespresso-core-css-default',
		],
	} ),
	new webpack.ProvidePlugin( {
		React: 'react',
	} ),
	new WebpackAssetsManifest( {
		output: assetsManifestOutputPath,
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
