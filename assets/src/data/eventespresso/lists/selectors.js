/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { REDUCER_KEY } from './';
import { validateEntityHasKey } from '../../model';

/**
 * External dependencies
 */
import { __, sprintf } from '@eventespresso/i18n';

/**
 * Returns true if resolution is in progress for the lists selector of the given
 * name and arguments.
 *
 * @param { string } selectorName
 * @param { ...* } args
 * @return {boolean}  Whether resolution is in progress.
 */
function isResolving( selectorName, ...args ) {
	return select( 'core/data' ).isResolving( REDUCER_KEY, selectorName, args );
}

/**
 * Returns all the items for the given modelName and queryString
 *
 * @param {Object} state Data state.
 * @param {string} modelName The model the items are being retrieved for.
 * @param {string} queryString The query string for retrieving the items.
 * @return {Array} Returns an array of items for the given model and query.
 */
export function getItems( state, modelName, queryString ) {
	return state[ modelName ] && state[ modelName ][ queryString ] ?
		state[ modelName ][ queryString ] :
		[];
}

/**
 * Returns whether the items for the given model name and query string are being
 * requested.
 *
 * @param {Object} state Data state.
 * @param {string} modelName  The model the items are being requested for.
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
export function isRequestingItems( state, modelName, queryString ) {
	validateEntityHasKey(
		modelName,
		state,
		sprintf(
			__(
				'The given modelName (%s) does not exist in the state.',
				'event_espresso',
			),
			modelName,
		),
	);
	return isResolving( 'getItems', modelName, queryString );
}

/**
 * Selector specific to events.
 *
 * @param {Object} state  Data state.
 * @param {string} queryString The query string for the request
 * @return {Array} An array of event entities for the given model and query.
 */
export function getEvents( state, queryString ) {
	return getItems( state, 'event', queryString );
}

/**
 * Selector specific to events for checking if requesting events.
 *
 * @param {Object} state Data state.
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
export function isRequestingEvents( state, queryString ) {
	return isResolving( 'getEvents', queryString );
}
