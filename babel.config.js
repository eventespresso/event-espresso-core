module.exports = function( api ) {
	api.cache( true );

	return {
		presets: [
			'@wordpress/babel-preset-default',
		],
		plugins: [
			/** this is needed because plugin exit modal uses react not wp.element */
			'@babel/plugin-proposal-class-properties',
		],
		env: {
			production: {
				plugins: [
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
