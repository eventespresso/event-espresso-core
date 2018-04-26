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
 * @param {string} modelName  The model the itesm are being requested for.
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
export function isRequestingItems( state, modelName, queryString ) {
	if ( state[ modelName ] && state[ modelName ][ queryString ] ) {
		return state[ modelName ][ queryString ] === null;
	}
	return true;
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
