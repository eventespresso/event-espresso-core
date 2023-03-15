import { merge } from 'webpack-merge';
import webpackConfig from './webpack.common.js';
import pluginsConfig from './bin/plugins-config.js';

webpackConfig.forEach((config, index) => {
	const plugins = config.entry['eventespresso-vendor']
		? pluginsConfig.withoutExtraction
		: pluginsConfig.withExtraction;
	webpackConfig[index] = merge(config, {
		mode: 'production',
		plugins,
	});
});

export default webpackConfig;
