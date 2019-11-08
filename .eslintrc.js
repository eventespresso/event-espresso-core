module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
		'plugin:jest/recommended',
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
		'react'
    ],
    rules: {
		'jest/valid-describe': 'off',
		'@wordpress/dependency-group': 'off',
		'comma-dangle': 'off',
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
