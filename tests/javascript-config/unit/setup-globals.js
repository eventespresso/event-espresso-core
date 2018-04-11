/**
 * Setup globals used in various tests
 */
// Set up `wp.*` aliases.  Handled by Webpack outside of the test build.
global.eejsdata = {
	data: {
		testData: true
	},
};