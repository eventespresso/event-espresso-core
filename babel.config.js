module.exports = function(api) {
	api.cache(true);

	return {
		presets: ['@wordpress/babel-preset-default'],
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
