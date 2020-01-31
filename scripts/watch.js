/* eslint-disable */
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('../config/paths');
const webpack = require('webpack');
const config = require('../config/webpack.config.js');
const devConfig = config('development');

webpack(devConfig).watch({}, (err, stats) => {
	if (err) {
		console.error(err);
	} else {
		copyPublicFolder();
	}
	console.error(
		stats.toString({
			chunks: false,
			colors: true,
		})
	);
});

function copyPublicFolder() {
	fs.copySync(paths.appPublic, paths.appBuild, {
		dereference: true,
		filter: (file) => file !== paths.appHtml,
	});
}
