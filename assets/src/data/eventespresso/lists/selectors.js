/**
 * Internal dependencies
 */
import { assertEntityHasKey } from '../../model';
import { isResolving } from '../base-selectors';
import { REDUCER_KEY } from './constants';

/**
 * External dependencies
 */
import { __, sprintf } from '@eventespresso/i18n';

const EMPTY_ARRAY = [];
const EMPTY_MAP = new Map();

/**
 * Generic helper for retrieving items from state for given identifier and
 * queryString.
 *
 * @param {Object} state
 * @param {string} identifier
 * @param {string} queryString
 * @param {*} defaultEmpty  Caller can supply what the default is when state is
 * doesn't have entries for the given identifier and queryString
 * @return {Array|Object} Returns the array of items if the given identifier/
 * querystring does not exist in the state or the given items as an array or
 * object (depending on how they are stored in the state).
 */
function retrieveItems(
	state,
	identifier,
	queryString,
	defaultEmpty = EMPTY_ARRAY
) {
	return state[ identifier ] && state[ identifier ][ queryString ] ?
		state[ identifier ][ queryString ] :
		defaultEmpty;
}

/**
 * Returns all the items for the given identifier and queryString
 *
 * @param {Object} state Data state.
 * @param {string} identifier The identifier the items are being retrieved for.
 * @param {string} queryString The query string for retrieving the items.
 * @return {Array} Returns an array of items for the given model and query.
 */
export function getItems( state, identifier, queryString ) {
	return retrieveItems( state, identifier, queryString );
}

/**
 * Returns all the model entities for the given modelName and query string.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} queryString
 * @return {Map} Returns entities.
 */
export function getEntities( state, modelName, queryString ) {
	return retrieveItems( state, modelName, queryString, EMPTY_MAP );
}

export function getEntitiesByIds( state, modelName, ids = [] ) {
	/**
	 * @todo once https://github.com/eventespresso/event-espresso-core/issues/781
	 * is done, then we'll have an easier way to build the necessary query for
	 * this type of request.
	 */
}

/**
 * Helper indicating whether the given identifier, selectorName, and queryString
 * is being resolved or not.
 *
 * @param {Object} state
 * @param {string} identifier
 * @param {string} selectorName
 * @param {string} queryString
 * @return {boolean} Returns true if the selector is currently requesting items.
 */
function isRequesting( state, identifier, selectorName, queryString ) {
	assertEntityHasKey(
		identifier,
		state,
		sprintf(
			__(
				'The given identifier (%s) does not exist in the state.',
				'event_espresso',
			),
			identifier,
		),
	);
	return isResolving( REDUCER_KEY, selectorName, identifier, queryString );
}

/**
 * Returns whether the items for the given model name and query string are being
 * requested.
 *
 * @param {Object} state Data state.
 * @param {string} identifier  The identifier for the items being requested
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
export function isRequestingItems( state, identifier, queryString ) {
	return isRequesting( state, identifier, 'getItems', queryString );
}

/**
 * Returns whether the get entities request is in the process of being resolved
 * or not.
 * @param {Object} state
 * @param {string} modelName
 * @param {string} queryString
 * @return {boolean} True means entities (for the given model) are being
 * requested.
 */
export function isRequestingEntities(
	state,
	modelName,
	queryString
) {
	return isRequesting( state, modelName, 'getEntities', queryString );
}
