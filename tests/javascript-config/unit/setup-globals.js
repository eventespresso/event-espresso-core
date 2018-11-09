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

Object.defineProperty( global.wp, 'element', {
	get: () => require( '@wordpress/element' ),
} );
Object.defineProperty( global.wp, 'blocks', {
	get: () => require( '@wordpress/blocks' ),
} );

// this just saves having to import React in all our files (so JSX is
// transformed)for tests to work.  For builds, webpack is configured to provide
// the React module to any files needing it.
global.React = require( 'react' );
