module.exports = function(api) {
	api.cache(true);

	const presets = [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
		'@wordpress/babel-preset-default',
	];

	const plugins = ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'];

	return {
		presets,
		plugins,
		env: {
			production: {
				plugins: [
					'ramda',
					[
						'@wordpress/babel-plugin-makepot',
						{
							output: 'languages/ee-js.pot',
						},
					],
				],
			},
		},
	};
};
