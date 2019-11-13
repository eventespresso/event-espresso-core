const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const webpack = require( 'webpack' );
const common = require( './webpack.common.js' );
const miniExtract = require( 'mini-css-extract-plugin' );
const assetsData = Object.create( null );
const DependencyExtractionWebpackPlugin = require(
	'@wordpress/dependency-extraction-webpack-plugin'
);

const { requestToExternal, requestToHandle } = require(
	'./asset-dependency-maps'
);
const { assetsManifestOutputPath } = require( './paths' );

const pluginsConfigWithExternals = [
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

const pluginsConfigWithoutExternals = [
	new WebpackAssetsManifest( {
		output: assetsManifestOutputPath,
		assets: assetsData,
	} ),
	new webpack.ProvidePlugin( {
		React: 'react',
	} ),
	new miniExtract( {
		filename: '[name].[contenthash].dist.css',
	} ),
];

common.forEach( ( config, index ) => {
	const plugins = config.entry[ 'eventespresso-vendor' ] ?
		pluginsConfigWithoutExternals :
		pluginsConfigWithExternals;

	common[ index ] = merge( config, {
		devtool: 'inline-source-map',
		plugins,
		mode: 'development',
	} );
} );

module.exports = common;
