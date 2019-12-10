module.exports = function(api) {
	api.cache(true);

	const presets = [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
		'@wordpress/babel-preset-default',
	];

	return {
		presets,
		plugins: ['@babel/plugin-proposal-class-properties'],
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
