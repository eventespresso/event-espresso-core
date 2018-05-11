/**
 * External imports
 */
import { data } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import { validateEntityHasKey } from './validators';

export const { collection_endpoints: endpoints = {} } = data.paths;

/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {GeneralException}
 */
export const getEndpoint = ( modelName ) => {
	validateEntityHasKey( modelName, endpoints );
	return endpoints[ modelName ];
};

/**
 * Applies the provided queryString to the endpoint for the provided model name.
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */
export const applyQueryString = ( modelName, queryString ) => {
	return getEndpoint( modelName ) + '?' + queryString;
};
