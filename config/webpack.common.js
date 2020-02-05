const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const miniExtract = require('mini-css-extract-plugin');
const path = require('path');

const { pathToDistFolder, pathToEDTRv1, pathToPrototype } = require('./paths');

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
					plugins: function() {
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
			'eejs-core': pathToEDTRv1 + 'eejs/index.js',
		},
		module: moduleConfigWithJsRules,
		output: {
			library: ['eejs'],
			libraryTarget: 'this',
		},
	},
	// {
	// 	entry: {
	// 		'eventespresso-vendor': pathToEDTRv1 + 'eejs/vendor/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'vendor'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-utils': pathToEDTRv1 + 'utils/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'utils'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-validators': pathToEDTRv1 + 'eejs/validators/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'validators'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-data-stores': pathToEDTRv1 + 'data/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	watchOptions: {
	// 		poll: 1000,
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-helpers': pathToEDTRv1 + 'data/helpers/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'helpers'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-model': pathToEDTRv1 + 'data/model/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'model'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-model-schema': pathToEDTRv1 + 'data/eventespresso/schema/index.js',
	// 	},
	// 	output: {
	// 		library: ['eejs', 'modelSchema'],
	// 		libraryTarget: 'this',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	watchOptions: {
	// 		poll: 1000,
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-value-objects': pathToEDTRv1 + 'vo/index.js',
	// 	},
	// 	module: moduleConfigWithJsRules,
	// 	output: {
	// 		library: ['eejs', 'valueObjects'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-hocs': pathToEDTRv1 + 'higher-order-components/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	output: {
	// 		library: ['eejs', 'hocs'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-components': pathToEDTRv1 + 'components/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	output: {
	// 		library: ['eejs', 'components'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-editor-hocs': pathToEDTRv1 + 'editor-hocs/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	output: {
	// 		library: ['eejs', 'editorHocs'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-editor': pathToEDTRv1 + 'editor/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	output: {
	// 		library: ['eejs', 'editor'],
	// 		libraryTarget: 'this',
	// 	},
	// },
	// {
	// 	entry: {
	// 		'ee-wp-plugins-page': pathToEDTRv1 + 'wp-plugins-page/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	watchOptions: {
	// 		poll: 1000,
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-core-blocks': pathToEDTRv1 + 'blocks/index.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	watchOptions: {
	// 		poll: 1000,
	// 	},
	// },
	// {
	// 	entry: {
	// 		'eventespresso-core-blocks-frontend': pathToEDTRv1 + 'blocks/index-frontend.js',
	// 	},
	// 	module: moduleConfigWithJsAndCssRules,
	// 	watchOptions: {
	// 		poll: 1000,
	// 	},
	// },
	{
		entry: {
			'eventespresso-core-css-default': appSrc + '/components/ui/styles/themes/default/index.js',
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

const checkAndBuildOnlyEditorFiles = ({ entry }) => {
	if (process.env.ONLY_EDITOR) {
		if (entry['eventespresso-event-editor']) {
			return true;
		}

		return false;
	}

	return true;
};

const enhancedConfig = config.map(enhance).filter(checkAndBuildOnlyEditorFiles);

module.exports = enhancedConfig;
