module.exports = function( api ) {
	api.cache( true );

	return {
		presets: [
			'@wordpress/babel-preset-default',
		],
		plugins: [
			'@wordpress/babel-plugin-import-jsx-pragma',
			'@babel/transform-react-jsx',
			'@babel/plugin-proposal-object-rest-spread',
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
