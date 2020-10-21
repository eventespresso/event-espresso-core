module.exports = {
	root: true,
	extends: ['./eslint/config.js'],
	overrides: [
		{
			files: ['test/e2e/**/*.js'],
			globals: {
				page: true,
				browser: true,
				wp: true,
				eejsdata: true,
			},
			env: {
				browser: true,
			},
		},
		{
			files: ['*.js'],
			rules: {
				'react/react-in-jsx-scope': 'off',
				'jsdoc/no-undefined-types': 'off',
				'@wordpress/i18n-translator-comments': 'off',
				'@wordpress/valid-sprintf': 'off',
				'jsdoc/check-types': 'off',
				'jsdoc/check-tag-names': 'off',
				'react/no-render-return-value': 'off',
				'jsdoc/check-param-names': 'off',
				'jsdoc/valid-types': 'off',
				'no-unused-vars': 'off',
				'jest/expect-expect': 'off',
			},
			globals: {
				eejsdata: true,
			},
		},
	],
};
