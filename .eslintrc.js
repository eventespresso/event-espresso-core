module.exports = {
	root: true,
	extends: [
		'./eslint/config.js',
	],
	overrides: [
		{
			files: [ 'test/e2e/**/*.js' ],
			globals: {
				page: true,
				browser: true,
				wp:true,
				eejsdata:true,
			},
			env: {
				browser:true,
			}
		},
		{
			files: [ '*.js' ],
			rules: {
				"react/react-in-jsx-scope": "off",
			},
			globals: {
				eejsdata:true
			}
		}
	],
};