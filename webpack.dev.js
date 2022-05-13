const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.common.js');
const pluginsConfig = require('./bin/plugins-config.js');

webpackConfig.shared.forEach((config, index) => {
	const plugins = config.entry['eventespresso-vendor']
		? pluginsConfig.withoutExternals
		: pluginsConfig.withExternals;

	webpackConfig.shared[index] = merge(
		config,
		{
			devtool: 'inline-source-map',
			mode: 'development',
			plugins,
		}
	);
});
module.exports = webpackConfig.shared;
