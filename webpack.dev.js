const merge = require( 'webpack-merge' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const common = require( './webpack.common.js' );
const miniExtract = require( 'mini-css-extract-plugin' );
const assetsData = Object.create( null );
const DependencyExtractionWebpackPlugin = require(
	'@wordpress/dependency-extraction-webpack-plugin'
);
const { requestToExternal, requestToHandle } = require(
	'./bin/asset-dependency-maps'
);
const pluginsConfigWithExternals = [
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
const pluginsConfigWithoutExternals = [
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
	//delete temporary named config item so no config errors
	delete common[ index ].configName;
} );
module.exports = common;
