const path = require( 'path' );
const assets = './assets/src/';
const miniExtract = require( 'mini-css-extract-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const externals = {
	jquery: 'jQuery',
	'@eventespresso/eejs': 'eejs',
	'@eventespresso/i18n': 'eejs.i18n',
	'@wordpress/api-fetch': 'wp.apiFetch',
	'@wordpress/data': 'wp.data',
	'@wordpress/element': 'wp.element',
	'@wordpress/components': 'wp.components',
	'@wordpress/blocks': 'wp.blocks',
	'@wordpress/editor': 'wp.editor',
	'@wordpress/compose': 'wp.compose',
	'@wordpress/hooks': 'wp.hooks',
	'@wordpress/url': 'wp.url',
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-redux': 'eejs.vendor.reactRedux',
	redux: 'eejs.vendor.redux',
	classnames: 'eejs.vendor.classnames',
	lodash: 'lodash',
	'moment-timezone': 'eejs.vendor.moment',
	cuid: 'eejs.vendor.cuid',
};

/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
const config = [
	{
		configName: 'eejs',
		entry: {
			eejs: assets + 'eejs/index.js',
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
			libraryTarget: 'var',
		},
	},
	{
		configName: 'eejsVendor',
		entry: {
			vendor: assets + 'eejs/vendor/index.js',
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'hooks',
		entry: {
			hooks: assets + 'hooks/index.js',
		},
		externals,
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'validators',
		entry: {
			validators: assets + 'eejs/validators/index.js',
		},
		externals,
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'helpers',
		entry: {
			helpers: assets + 'data/helpers/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
		} ),
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'model',
		entry: {
			model: assets + 'data/model/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/value-objects': 'eejs.valueObjects',
		} ),
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'value-objects',
		entry: {
			valueObjects: assets + 'vo/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
		} ),
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
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'hocs',
		entry: {
			hocs: assets + 'higher-order-components/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
			'@eventespresso/value-objects': 'eejs.valueObjects',
		} ),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
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
		output: {
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'components',
		entry: {
			components: assets + 'components/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
			'@eventespresso/value-objects': 'eejs.valueObjects',
			'@eventespresso/higher-order-components': 'eejs.hocs',
			'@eventespresso/hooks': 'eejs.hooks',
		} ),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
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
		},
		output: {
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'editor-hocs',
		entry: {
			'editor-hocs': assets + 'editor/hocs/index.js',
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
			'@eventespresso/value-objects': 'eejs.valueObjects',
			'@eventespresso/higher-order-components': 'eejs.hocs',
			'@eventespresso/components': 'eejs.components',
			'@eventespresso/hooks': 'eejs.hooks',
		} ),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
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
		output: {
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', 'editorHocs' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'editor',
		entry: {
			editor: [
				assets + 'editor/index.js',
			],
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
			'@eventespresso/value-objects': 'eejs.valueObjects',
			'@eventespresso/higher-order-components': 'eejs.hocs',
			'@eventespresso/components': 'eejs.components',
			'@eventespresso/editor-hocs': 'eejs.editorHocs',
			'@eventespresso/hooks': 'eejs.hooks',
		} ),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',

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
		},
		output: {
			filename: 'ee-[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
			library: [ 'eejs', '[name]' ],
			libraryTarget: 'var',
		},
	},
	{
		configName: 'base',
		entry: {
			'wp-plugins-page': [
				assets + 'wp-plugins-page/index.js',
			],
			'data-stores': [
				assets + 'data/index.js',
			],
			'eventespresso-core-blocks': [
				assets + 'blocks/index.js',
			],
			'eventespresso-core-blocks-frontend': [
				assets + 'blocks/index-frontend.js',
			],
			'core-default-theme': [
				assets + 'components/ui/styles/themes/default/index.js',
			],
		},
		externals: Object.assign( externals, {
			'@eventespresso/validators': 'eejs.validators',
			'@eventespresso/helpers': 'eejs.helpers',
			'@eventespresso/model': 'eejs.model',
			'@eventespresso/value-objects': 'eejs.valueObjects',
			'@eventespresso/higher-order-components': 'eejs.hocs',
			'@eventespresso/components': 'eejs.components',
			'@eventespresso/editor-hocs': 'eejs.editorHocs',
			'@eventespresso/editor': 'eejs.editor',
			'@eventespresso/hooks': 'eejs.hooks',
		} ),
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
		},
		watchOptions: {
			poll: 1000,
		},
	},
];
module.exports = config;
