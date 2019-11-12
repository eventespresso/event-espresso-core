const path = require( 'path' );
const assets = './assets/ZZZ/';
const miniExtract = require( 'mini-css-extract-plugin' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const del = require( 'del' );

const pathToDistFolder = path.resolve( __dirname, '../assets/dist' );
/**
 * Clean build folder before running build
 */
del.sync( [ path.resolve( pathToDistFolder, '*' ) ] );

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
};

const moduleConfigWithJsAndCssRules = {
	rules: [
		rulesConfig.jsRulesConfig,
		rulesConfig.cssRulesConfig,
	],
};

const moduleConfigWithJsRules = { rules: [ rulesConfig.jsRulesConfig ] };

/** see below for multiple configurations.
 /** https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations */
const config = [
	{
		entry: {
			'eejs-core': assets + 'eejs/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-vendor': assets + 'eejs/vendor/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'vendor' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-utils': assets + 'utils/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'utils' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hooks': assets + 'hooks/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'hooks' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-validators': assets + 'eejs/validators/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'validators' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-data-stores': assets + 'data/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-helpers': assets + 'data/helpers/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			filename: '[name].[chunkhash].dist.js',
			library: [ 'eejs', 'helpers' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model': assets + 'data/model/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'model' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model-schema': assets + 'data/eventespresso/schema/index.js',
		},
		output: {
			library: [ 'eejs', 'modelSchema' ],
			libraryTarget: 'this',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-value-objects': assets + 'vo/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: [ 'eejs', 'valueObjects' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hocs': assets + 'higher-order-components/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: [ 'eejs', 'hocs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-components': assets + 'components/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: [ 'eejs', 'components' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor-hocs': assets + 'editor-hocs/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: [ 'eejs', 'editorHocs' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor': assets + 'editor/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: [ 'eejs', 'editor' ],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'ee-wp-plugins-page': assets + 'wp-plugins-page/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks': assets + 'blocks/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks-frontend': assets +
				'blocks/index-frontend.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-css-default': assets +
				'components/ui/styles/themes/default/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
];

const enhance = ( conf ) => {
	const resolve = {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [ '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js' ],
	};
	const enhancedConf = { ...conf, resolve };

	if ( ! enhancedConf.output ) {
		enhancedConf.output = {};
	} else {
		enhancedConf.output.path = pathToDistFolder;
		enhancedConf.output.filename = '[name].[chunkhash].dist.js';
	}

	return enhancedConf;
};

const addLoaders = ( conf ) => {
	const loaders = [
		// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
		{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
	];
	const preLoaders = [
		// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
		{ test: /\.js$/, loader: 'source-map-loader' },
	];

	return {
		...conf,
		module: {
			...conf.module,
			loaders,
			preLoaders,
		},
	};
};

const enhancedConfig = config.map( enhance ).map( addLoaders );

module.exports = enhancedConfig;
