/**
 * Internal imports
 */
import { ACTION_TYPES as types } from './action-types';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {string} identifier
 * @param {string} queryString  Results are stored indexed by the query
 * string generating them.
 * @param {Array<*>} items     items attached with the list.
 * @return {
 * 	{
 * 		type: string,
 * 		identifier: string,
 * 		queryString: string,
 * 		items: Array<*>
 *	}
 * } Object for action.
 */
export function receiveResponse( identifier, queryString, items = [] ) {
	return {
		type: types.RECEIVE_LIST,
		identifier,
		queryString,
		items,
	};
}

/**
 * Returns an action object used in updating the store with the provided entity
 * items retrieved from a request using the given query string.
 *
 * @param {string} modelName
 * @param {string} queryString
 * @param {Array<BaseEntity>}entities
 * @return {{type: string, identifier: string, queryString: string, items:
 *   Array<BaseEntity>}} An action object.
 */
export function receiveEntityResponse(
	modelName,
	queryString,
	entities = [],
) {
	return {
		type: types.RECEIVE_ENTITY_LIST,
		identifier: modelName,
		queryString,
		items: entities,
	};
}
