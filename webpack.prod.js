const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const miniExtract = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const wpi18nExtractor = require('./bin/i18n-map-extractor.js');

const {
	requestToExternal,
	requestToHandle,
} = require('./bin/asset-dependency-maps');

const common = require('./webpack.common.js');
const assetsData = Object.create(null);

const pluginsConfigWithExtraction = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
	new wpi18nExtractor({
		excludes: [
			'eejs-core',
			'eventespresso-vendor',
			'eventespresso-core-css-default',
		],
	}),
	new webpack.ProvidePlugin({
		React: 'react',
	}),
	new DependencyExtractionWebpackPlugin({
		requestToExternal,
		requestToHandle,
	}),
	new WebpackAssetsManifest({
		output: path.resolve(__dirname, 'assets/dist/build-manifest.json'),
		assets: assetsData,
	}),
	new miniExtract({
		filename: '[name].[contenthash].dist.css',
	}),
];

const pluginsConfigWithoutExtraction = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
	new wpi18nExtractor({
		excludes: [
			'eejs-core',
			'eventespresso-vendor',
			'eventespresso-core-css-default',
		],
	}),
	new webpack.ProvidePlugin({
		React: 'react',
	}),
	new WebpackAssetsManifest({
		output: path.resolve(__dirname, 'assets/dist/build-manifest.json'),
		assets: assetsData,
	}),
	new miniExtract({
		filename: '[name].[contenthash].dist.css',
	}),
];

common.forEach((config, index) => {
	const plugins = config.entry['eventespresso-vendor']
		? pluginsConfigWithoutExtraction
		: pluginsConfigWithExtraction;
	common[index] = merge(config, {
		plugins,
		mode: 'production',
	});
});

module.exports = common;
