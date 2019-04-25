module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:jest/recommended',
	],
	rules: {
		'jest/valid-describe': 'off',
		'@wordpress/dependency-group': 'off',
	},
};
