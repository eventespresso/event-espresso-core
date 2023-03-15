import { merge } from 'webpack-merge';
import webpackConfig from './webpack.common.js';
import pluginsConfig from './bin/plugins-config.js';

webpackConfig.forEach((config, index) => {
	const plugins = config.entry['eventespresso-vendor'] ? pluginsConfig.withoutExternals : pluginsConfig.withExternals;

	webpackConfig[index] = merge(config, {
		devtool: 'inline-source-map',
		mode: 'development',
		plugins,
	});
});

export default webpackConfig;
