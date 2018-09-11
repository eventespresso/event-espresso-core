/**
 * External imports
 */
import apiFetch from '@wordpress/api-fetch';

return {
	FETCH_FROM_API: ( action ) => {
		return apiFetch( { path: action.path } );
	},
};
