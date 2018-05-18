const path = require( 'path' );
const assets = './assets/src/';
const miniExtract = require( 'mini-css-extract-plugin' );
const autoprefixer = require( 'autoprefixer' );
const externals = {
	jquery: 'jQuery',
	'@eventespresso/eejs': 'eejs',
	'@eventespresso/i18n': 'eejs.i18n',
	'@wordpress/api-request': 'wp.apiRequest',
	'@wordpress/data': 'wp.data',
	'@wordpress/element': 'wp.element',
	'@wordpress/components': 'wp.components',
	'@wordpress/blocks': 'wp.blocks',
};
const reactVendorPackages = [
	'react',
	'react-dom',
	'react-redux',
	'redux',
	'classnames',
	'lodash',
];
/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
const config = [
	{
		configName: 'eejs',
		externals: {
			'@eventespresso/eejs': {
				this: 'eejs',
			},
		},
		entry: {
			eejs: [
				assets + 'eejs/index.js',
			],
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
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs' ],
			libraryTarget: 'this',
		},
	},
	{
		configName: 'base',
		entry: {
			reactVendor: reactVendorPackages,
			'wp-plugins-page': [
				assets + 'wp-plugins-page/index.js',
			],
			'data-stores': [
				assets + 'data/index.js',
			],
			'eventespresso-core-blocks': [
				assets + 'blocks/index.js',
			],
		},
		externals,
		output: {
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: {
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
							//can't use minimize because cssnano (the
							// dependency) doesn't parser the browserlist
							// extension in package.json correctly, there's
							// a pending update for it but css-loader
							// doesn't have the latest yet.
							// options: {
							//     minimize: true
							// }
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function() {
									return [ autoprefixer ];
								},
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		watchOptions: {
			poll: 1000,
		},
	},
];
module.exports = config;
