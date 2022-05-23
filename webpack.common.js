const del = require('del');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const miniExtract = require('mini-css-extract-plugin');

const assetsSrcPath = './assets/src/';
const outputPath = path.resolve(__dirname, 'assets/dist');

/**
 * Clean build folder before running build
 */
del.sync([path.resolve(outputPath, '**/*')]);

const rulesConfig = {
	jsRulesConfig: {
		test: /\.js$/,
		exclude: /node_modules/,
		use: 'babel-loader',
	},
	cssRulesConfig: {
		test: /\.css$/,
		use: [
			miniExtract.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[local]',
					},
				},
			},
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [autoprefixer, cssnano({ preset: 'default' })],
					},
					sourceMap: true,
				},
			},
		],
	},
};

const moduleConfigWithJsAndCssRules = {
	rules: [rulesConfig.jsRulesConfig, rulesConfig.cssRulesConfig],
};

const moduleConfigWithJsRules = { rules: [rulesConfig.jsRulesConfig] };

/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
const config = [
	{
		entry: {
			'eejs-core': assetsSrcPath + 'eejs/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs'],
			libraryTarget: 'window',
		},
	},
	{
		entry: {
			'eventespresso-vendor': assetsSrcPath + 'eejs/vendor/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'vendor'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-validators': assetsSrcPath + 'eejs/validators/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'validators'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-helpers': assetsSrcPath + 'data/helpers/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'helpers'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model': assetsSrcPath + 'data/model/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'model'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-value-objects': assetsSrcPath + 'vo/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'valueObjects'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hocs': assetsSrcPath + 'higher-order-components/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'hocs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-components': assetsSrcPath + 'components/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'components'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor-hocs': assetsSrcPath + 'editor/hocs/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs', 'editorHocs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'ee-wp-plugins-page': [assetsSrcPath + 'wp-plugins-page/index.js'],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-data-stores': [assetsSrcPath + 'data/index.js'],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks': [assetsSrcPath + 'blocks/index.js'],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks-frontend': [
				assetsSrcPath + 'blocks/index-frontend.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-css-default': [
				assetsSrcPath + 'components/ui/styles/themes/default/index.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
];

module.exports.shared = config;
