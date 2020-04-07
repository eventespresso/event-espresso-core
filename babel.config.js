module.exports = function (api) {
	api.cache(true);

	const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'];

	const plugins = [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-runtime',
		[
			'import',
			{
				libraryName: 'antd',
				style: 'css',
			},
		],
	];

	return {
		presets,
		plugins,
		env: {
			production: {
				plugins: [
					'ramda',
					// @todo Replace @wordpress/babel-plugin-makepot with WP CLI make-pot
					/* [
						'@wordpress/babel-plugin-makepot',
						{
							output: 'languages/ee-js.pot',
						},
					], */
				],
			},
		},
	};
};
