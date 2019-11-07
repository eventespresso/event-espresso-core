module.exports = {
	extends: [
		'plugin:jest/recommended',
		'plugin:react/recommended',
		'plugin:@wordpress/eslint-plugin/recommended',
	],
	rules: {
		'jest/valid-describe': 'off',
		'@wordpress/dependency-group': 'off',
	},
};
