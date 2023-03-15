import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import path from 'path';
import miniExtract from 'mini-css-extract-plugin';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { requestToExternal, requestToHandle } from './asset-dependency-maps.js';
import wpi18nExtractor from './i18n-map-extractor.js';

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
			excludes: ['eejs-core', 'eventespresso-vendor', 'eventespresso-core-css-default'],
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
			excludes: ['eejs-core', 'eventespresso-vendor', 'eventespresso-core-css-default'],
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
};

export default pluginsConfig;
