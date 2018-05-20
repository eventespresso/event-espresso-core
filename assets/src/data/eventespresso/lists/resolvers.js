/**
 * WordPress dependencies
 */
import apiRequest from '@wordpress/api-request';

/**
 * Internal dependencies
 */
import { receiveResponse } from './actions';
import { applyQueryString } from '../../model';

/**
 * Resolver for generic items returned from an endpoint.
 *
 * @param {Object} state  Data in state.
 * @param {string} modelName  The name of the model the items are for.
 * @param {string} queryString  Additional query string parameters passed on to
 *   the REST request.
 */
export async function* getItems( state, modelName, queryString ) {
	const items = await apiRequest( {
		path: applyQueryString( modelName,
			queryString,
		),
	} );
	yield receiveResponse( modelName, queryString, items );
}

/**
 * Resolver for event entities.
 *
 * @param {Object} state Data in state.
 * @param {string} queryString Additional query string parameters passed on to
 *   the REST request.
 * @return {IterableIterator<*>} A async iterable.
 */
export function getEvents( state, queryString ) {
	return getItems( state, 'event', queryString );
}
