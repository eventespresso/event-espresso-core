/**
 * Returns an action object used in signalling that the request for a given
 * model and query string has been made.
 *
 * @param { string } modelName
 * @param { string } queryString  Results are stored indexed by the query string
 *                                generating them.
 * @return {{type: string, modelName: string, queryString: string}} Object
 *                    for action.
 */
export function setRequested( modelName, queryString ) {
	return {
		type: 'SET_REQUESTED',
		modelName,
		queryString,
	};
}

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * @param { string } modelName
 * @param { string } queryString  Results are stored indexed by the query
 *   string
 *                                generating them.
 * @param { Array } items         Items returned from the query.
 * @return {{type: string, modelName: string, queryString: string, items:
 *   Array}} Object for action.
 */
export function receiveResponse( modelName, queryString, items = [] ) {
	return {
		type: 'RECEIVE_LIST',
		modelName,
		queryString,
		items,
	};
}
