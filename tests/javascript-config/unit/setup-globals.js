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
			admin_url: 'https://eetest.test/wp-admin/'
		}
	},
};