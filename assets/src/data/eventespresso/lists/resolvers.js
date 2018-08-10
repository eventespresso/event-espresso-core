/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

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
	const items = await apiFetch( {
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

/**
 * Resolver for datetime entities.
 *
 * @param {Object} state Data in state.
 * @param {string} queryString Additional query string parameters passed on to
 *   the REST request.
 * @return {IterableIterator<*>} A async iterable.
 */
export function getDatetimes( state, queryString ) {
	return getItems( state, 'datetime', queryString );
}

/**
 * Resolver for ticket entities.
 *
 * @param {Object} state Data in state.
 * @param {string} queryString Additional query string parameters passed on to
 *   the REST request.
 * @return {IterableIterator<*>} A async iterable.
 */
export function getTickets( state, queryString ) {
	return getItems( state, 'ticket', queryString );
}

/**
 * Resolver for registration status entities.
 *
 * @param {Object} state Data in state.
 * @return {IterableIterator<*>} A async iterable.
 */
export function getRegistrationStatuses( state ) {
	return getItems( state, 'status', 'where[STS_type]=registration' );
}
