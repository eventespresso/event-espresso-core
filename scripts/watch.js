/* eslint-disable */
const DEVELOPMENT = 'development';
process.env.NODE_ENV = DEVELOPMENT;

//const fs = require('fs-extra');
//const paths = require('../config/paths');
const webpack = require('webpack');
const config = require('../config/webpack.config.js');
const devConfig = config(DEVELOPMENT);

webpack(devConfig).watch(
	{
		poll: 500,
		aggregateTimeout: 500,
		ignored: /node_modules/,
	},
	(err, stats) => {
		if (err) {
			console.error(err);
		}
		console.log(
			stats.toString({
				chunks: false,
				colors: true,
			})
		);
	}
);
