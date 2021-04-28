const path = require('path');
const assets = './assets/src/';
const miniExtract = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

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
			'eejs-core': assets + 'eejs/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: outputPath,
			library: ['eejs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-vendor': assets + 'eejs/vendor/index.js',
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
			'eventespresso-validators': assets + 'eejs/validators/index.js',
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
			'eventespresso-helpers': assets + 'data/helpers/index.js',
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
			'eventespresso-model': assets + 'data/model/index.js',
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
			'eventespresso-value-objects': assets + 'vo/index.js',
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
			'eventespresso-hocs': assets + 'higher-order-components/index.js',
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
			'eventespresso-components': assets + 'components/index.js',
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
			'eventespresso-editor-hocs': assets + 'editor/hocs/index.js',
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
			'ee-wp-plugins-page': [assets + 'wp-plugins-page/index.js'],
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
			'eventespresso-data-stores': [assets + 'data/index.js'],
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
			'eventespresso-core-blocks': [assets + 'blocks/index.js'],
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
				assets + 'blocks/index-frontend.js',
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
				assets + 'components/ui/styles/themes/default/index.js',
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
module.exports = config;
