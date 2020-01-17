const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const miniExtract = require('mini-css-extract-plugin');
const path = require('path');

const { assetsPath, pathToDistFolder } = require('./paths');

/**
 * Clean build folder before running build
 */
del.sync([path.resolve(pathToDistFolder, '*')]);

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
					plugins: function () {
						return [autoprefixer, cssnano({ preset: 'default' })];
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
			'eejs-core': assetsPath + 'eejs/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-vendor': assetsPath + 'eejs/vendor/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'vendor'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-utils': assetsPath + 'utils/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'utils'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hooks': assetsPath + 'hooks/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'hooks'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-validators': assetsPath + 'eejs/validators/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'validators'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-data-stores': assetsPath + 'data/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-helpers': assetsPath + 'data/helpers/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'helpers'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model': assetsPath + 'data/model/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'model'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-model-schema': assetsPath + 'data/eventespresso/schema/index.js',
		},
		output: {
			library: ['eejs', 'modelSchema'],
			libraryTarget: 'this',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-value-objects': assetsPath + 'vo/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs', 'valueObjects'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-hocs': assetsPath + 'higher-order-components/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: ['eejs', 'hocs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-components': assetsPath + 'components/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: ['eejs', 'components'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor-hocs': assetsPath + 'editor-hocs/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: ['eejs', 'editorHocs'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor': assetsPath + 'editor/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: ['eejs', 'editor'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'eventespresso-editor-prototype': './assets/prototype/domain/eventEditor/index.tsx', // This change is just for the prototype.
		},
		module: moduleConfigWithJsAndCssRules,
		output: {
			library: ['eejs', 'editor'],
			libraryTarget: 'this',
		},
	},
	{
		entry: {
			'ee-wp-plugins-page': assetsPath + 'wp-plugins-page/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks': assetsPath + 'blocks/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-blocks-frontend': assetsPath + 'blocks/index-frontend.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
	{
		entry: {
			'eventespresso-core-css-default': assetsPath + 'components/ui/styles/themes/default/index.js',
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
];

const enhance = (conf) => {
	const resolve = {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
	};
	const enhancedConf = { ...conf, resolve };

	if (!enhancedConf.output) {
		enhancedConf.output = {};
	}

	enhancedConf.output.path = pathToDistFolder;
	enhancedConf.output.filename = '[name].[chunkhash].dist.js';

	return enhancedConf;
};

const addLoaders = (conf) => {
	const enhancedConf = { ...conf };

	enhancedConf.module.rules = [
		...conf.module.rules,
		{
			test: /\.ts(x?)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'ts-loader',
				},
			],
		},
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader',
		},
	];

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	enhancedConf.externals = {
		react: 'React',
		'react-dom': 'ReactDOM',
	};

	return enhancedConf;
};

const checkAndBuildOnlyEditorFiles = ({ entry }) => {
	if (process.env.ONLY_EDITOR) {
		if (entry['eventespresso-editor-prototype']) {
			return true;
		}

		return false;
	}

	return true;
};

const enhancedConfig = config
	.map(enhance)
	.map(addLoaders)
	.filter(checkAndBuildOnlyEditorFiles);

module.exports = enhancedConfig;
