/**
 * Internal dependencies
 */
import { isResolving } from '../base-selectors';
import { REDUCER_KEY } from './constants';

/**
 * External dependencies
 */
import { __, sprintf } from '@eventespresso/i18n';
import createSelector from 'rememo';
import {
	assertImmutableObjectHasPath,
	getPrimaryKeyQueryString,
} from '@eventespresso/model';
import { OrderedMap, Set } from 'immutable';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * Generic helper for retrieving items from state for given identifier and
 * queryString.
 *
 * @param {Immutable.Map} state
 * @param {string} identifier
 * @param {string} queryString
 * @param {*} defaultEmpty  Caller can supply what the default is when state is
 * doesn't have entries for the given identifier and queryString
 * @return {Array|Object} Returns the array of items if the given identifier/
 * querystring does not exist in the state or the given items as an array or
 * object (depending on how they are stored in the state).
 */
const retrieveItems =
	(
		state,
		identifier,
		queryString,
		defaultEmpty = Set()
	) => state.getIn( [ identifier, queryString ] ) || defaultEmpty;

/**
 * Returns all the items for the given identifier and queryString
 *
 * @param {Immutable.Map} state Data state.
 * @param {string} identifier The identifier the items are being retrieved for.
 * @param {string} queryString The query string for retrieving the items.
 * @return {Array} Returns an array of items for the given model and query.
 */
export const getItems = createSelector(
	( state, identifier, queryString ) => retrieveItems(
		state,
		identifier,
		queryString
	).toArray(),
	( state, identifier, queryString ) => [
		state.getIn( [ identifier, queryString ] ),
	]
);

/**
 * Returns all the model entities for the given modelName and query string.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {string} queryString
 * @return {Array<BaseEntity>} Returns array of entities.
 */
export const getEntities = createSelector(
	( state, modelName, queryString ) => retrieveItems(
		state,
		modelName,
		queryString,
		OrderedMap()
	).valueSeq().toArray(),
	( state, modelName, queryString ) => [
		state.getIn( [ modelName, queryString ] ),
	]
);

/**
 * Returns all the model entities for the given modelName and query string.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {Array} ids
 * @return {Array<BaseEntity>} An array of entities.
 */
export const getEntitiesByIds = ( state, modelName, ids = [] ) => {
	try {
		const queryString = getPrimaryKeyQueryString( modelName, ids );
		return getEntities( state, modelName, queryString );
	} catch ( e ) {
		return DEFAULT_EMPTY_ARRAY;
	}
};

getEntitiesByIds.clear = () => getEntities.clear();

/**
 * Helper indicating whether the given identifier, selectorName, and queryString
 * is being resolved or not.
 *
 * @param {Immutable.Map} state
 * @param {string} identifier
 * @param {string} selectorName
 * @param {string} queryString
 * @return {boolean} Returns true if the selector is currently requesting items.
 */
function isRequesting( state, identifier, selectorName, queryString ) {
	assertImmutableObjectHasPath(
		[ identifier ],
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
 * Returns whether the items for the given identifier and query string are being
 * requested.
 *
 * @param {Immutable.Map} state Data state.
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
 * @param {Immutable.Map} state
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
