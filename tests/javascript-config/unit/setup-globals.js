/**
 * Setup globals used in various tests
 */
// Setup eejsdata global. This is something set in EE core via
// wp_localize_script so its outside of the build process.
global.eejsdata = {
	data: {
		testData: true
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

[
	'element',
	'components',
	'utils',
	'blocks',
	'date',
	'editor',
	'data',
	'core-data',
	'edit-post',
	'viewport',
	'plugins',
].forEach( entryPointName => {
	Object.defineProperty( global.wp, entryPointName, {
		get: () => require( 'gutenberg/' + entryPointName ),
	} );
} );
