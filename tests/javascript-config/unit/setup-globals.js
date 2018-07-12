/**
 * Setup globals used in various tests
 */
// Setup eejsdata global. This is something set in EE core via
// wp_localize_script so its outside of the build process.
global.eejsdata = {
	data: {
		testData: true,
		paths: {
			site_url: 'https://eetest.test/',
			admin_url: 'https://eetest.test/wp-admin/',
		}
	},
};

// Set up `wp.*` aliases.  Doing this because any tests importing wp stuff will
// likely run into this.
global.wp = {
	shortcode: {
		next() {},
		regexp: jest.fn().mockReturnValue( new RegExp() ),
	},
};

//non packaged WP stuff
[
	'components',
	'utils',
	'blocks',
	'editor',
	'edit-post',
	'viewport',
].forEach( entryPointName => {
	Object.defineProperty( global.wp, entryPointName, {
		get: () => require( 'gutenberg/' + entryPointName ),
	} );
} );

//packaged WP stuff
[
	'element',
	'date',
	'data',
	'a11y',
	'autop',
	'blob',
	'deprecated',
	'dom',
	'hooks',
	'i18n',
	'core-data',
	'plugins',
	'keycodes',
].forEach( entryPointName => {
	Object.defineProperty( global.wp, entryPointName, {
		get: () => require( '@wordpress' + entryPointName + '/src' ),
	} );
} );
