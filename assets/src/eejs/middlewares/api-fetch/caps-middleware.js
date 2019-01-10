/**
 * External dependencies
 */
import { addQueryArgs, hasQueryArg } from '@wordpress/url';

export const CONTEXT_CAPS_READ = 'read';
export const CONTEXT_CAPS_READ_ADMIN = 'read_admin';
export const CONTEXT_CAPS_EDIT = 'edit';
export const CONTEXT_CAPS_DELETE = 'delete';

/**
 * Helper function for whether the path should have the context appended or not.
 * @param {string} pathType apiFetch accepts 'path' or 'url' so we allow for
 * checking that here.
 * @param {Object} options the options object provided to api-fetch
 * @return {boolean} Whether context should be appended or not.
 */
function shouldBeAppended( pathType, options ) {
	return typeof options[ pathType ] === 'string' &&
		( ! options.method || options.method === 'GET' ) &&
		! hasQueryArg( options[ pathType ], 'caps' ) &&
		/ee\/v4\.8\.36/.exec( options[ pathType ] ) !== null;
}

/**
 * Middleware for the @wordpress/api-fetch library that appends the query arg
 * context with the value of `read_admin` to every get request to an
 * ee/v4.8.36 endpoint.
 *
 * @param { string } context
 * @return {function} middleware callback
 */
const capsMiddleware = ( context = CONTEXT_CAPS_READ ) => ( options, next ) => {
	if ( shouldBeAppended( 'url', options ) ) {
		options.url = addQueryArgs(
			options.url,
			{ caps: context }
		);
	}

	if ( shouldBeAppended( 'path', options ) ) {
		options.path = addQueryArgs(
			options.path,
			{ caps: context }
		);
	}
	return next( options, next );
};

export default capsMiddleware;
