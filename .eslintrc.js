module.exports = {
	root: true,
	extends: [
		'./eslint/config.js',
		'plugin:jest/recommended',
	],
	'plugins': [
		'wordpress',
		'jest',
	],
	env: {
		'jest/globals': true,
	},
	globals: {
		wpApiSettings: true,
		eejsdata: true
	},
	overrides: [
		{
			files: [ 'test/e2e/**/*.js' ],
			globals: {
				page: true,
				browser: true,
			},
		},
		{
			files: [ '*.js' ],
			rules: {
				"react/react-in-jsx-scope": "off",
			}
		}
	],
};