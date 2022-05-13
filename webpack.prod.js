const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.common.js');
const pluginsConfig = require('./bin/plugins-config.js');

webpackConfig.shared.forEach((config, index) => {
	const plugins = config.entry['eventespresso-vendor']
		? pluginsConfig.withoutExtraction
		: pluginsConfig.withExtraction;
	webpackConfig.shared[index] = merge(
		config,
		{
			mode: 'production',
			plugins,
		}
	);
});
module.exports = webpackConfig.shared;
