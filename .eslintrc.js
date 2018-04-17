module.exports = {
	'extends': [
		'./eslint/config.js',
		'plugin:jest/recommended',
	],
	'plugins': [
		'wordpress',
	],
	env: {
		'jest/globals': true,
	},
	globals: {
		wpApiSettings: true,
		eejsdata: true
	},
	plugins: [
		'jest',
	],
	overrides: [
		{
			files: [ 'test/e2e/**/*.js' ],
			globals: {
				page: true,
				browser: true,
			},
		},
	],
};