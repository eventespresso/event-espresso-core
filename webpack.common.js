const path = require( 'path' );
const assets = './assets/src/';
const miniExtract = require( 'mini-css-extract-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const del = require( 'del' );

const outputPath = path.resolve( __dirname, 'assets/dist' );
/**
 * Clean build folder before running build
 */
del.sync( [ path.resolve( outputPath, '**/*' ) ] );

const moduleWithCssRules = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: 'babel-loader',
		},
		{
			test: /\.css$/,
			use: [
				miniExtract.loader,
				{
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[local]',
					},
				},
				{
					loader: 'postcss-loader',
					options: {
						// eslint-disable-next-line object-shorthand
						plugins: function() {
							return [
								autoprefixer,
								cssnano( { preset: 'default' } ),
							];
						},
						sourceMap: true,
					},
				},
			],
		},
	],
};
const del = require( 'del' );
const outputPath = path.resolve( __dirname, 'assets/dist' );
/**
 * Clean build folder before running build
 */
del.sync( [ path.resolve( outputPath, '**/*' ) ] );

/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
const config = [
	{
		entry: {
			'eejs-core': assets + 'eejs/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-vendor': assets + 'eejs/vendor/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'vendor' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-validators': assets + 'eejs/validators/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'validators' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-helpers': assets + 'data/helpers/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'helpers' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model': assets + 'data/model/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'model' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-value-objects': assets + 'vo/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'valueObjects' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hocs': assets + 'higher-order-components/index.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'hocs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-components': assets + 'components/index.js',
		},
		module: moduleWithCssRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'components' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor-hocs': assets + 'editor/hocs/index.js',
		},
		module: moduleWithCssRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'editorHocs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'ee-wp-plugins-page': [
				assets + 'wp-plugins-page/index.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleWithCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-data-stores': [
				assets + 'data/index.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleWithCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks': [
				assets + 'blocks/index.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleWithCssRules,
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
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleWithCssRules,
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
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleWithCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
];
module.exports = config;
