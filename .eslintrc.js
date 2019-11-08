module.exports = {
	root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: [
		'plugin:jest/recommended',
		"plugin:react/recommended",
		'plugin:@wordpress/eslint-plugin/recommended'
	],
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            'jsx': true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
		"react-hooks"
    ],
    rules: {
		'comma-dangle': 'off',
		'jest/valid-describe': 'off',
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		'@wordpress/dependency-group': 'off',
	},
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
