const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const path = require('path');
const miniExtract = require('mini-css-extract-plugin');
const { requestToExternal, requestToHandle } = require('./asset-dependency-maps');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const wpi18nExtractor = require('./i18n-map-extractor.js');

const assetsData = Object.create(null);
const buildManifestPath = path.resolve(__dirname, '../assets/dist/build-manifest.json');

const pluginsConfig = {

	withExternals: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new DependencyExtractionWebpackPlugin({
			requestToExternal,
			requestToHandle,
		}),
		new WebpackAssetsManifest({
			output: buildManifestPath,
			assets: assetsData,
		}),
		new miniExtract({
			filename: '[name].[contenthash].dist.css',
		}),
	],

	withoutExternals: [
			new WebpackAssetsManifest({
				output: buildManifestPath,
				assets: assetsData,
			}),
			new webpack.ProvidePlugin({
				React: 'react',
			}),
			new miniExtract({
				filename: '[name].[contenthash].dist.css',
			}),
	],

	withExtraction: [
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
				output: buildManifestPath,
				assets: assetsData,
			}),
			new miniExtract({
				filename: '[name].[contenthash].dist.css',
			}),
	],

	withoutExtraction: [
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
				output: buildManifestPath,
				assets: assetsData,
			}),
			new miniExtract({
				filename: '[name].[contenthash].dist.css',
			}),
	],
}

module.exports = pluginsConfig;
