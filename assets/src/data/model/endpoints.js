/**
 * External imports
 */
import { data, exception as GeneralException } from '@eventespresso/eejs';
import { isUndefined } from 'lodash';

/**
 * WP Dependencies
 */
import { sprintf } from '@wordpress/i18n';

export const { collection_endpoints: endpoints = {} } = data;

/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {GeneralException}
 */
const getEndpoint = ( modelName ) => {
	if ( isUndefined( endpoints[ modelName ] ) ) {
		throw new GeneralException(
			sprintf(
				'There is no registered endpoint for the provided model name reference (%s)',
				modelName,
			),
		);
	}
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

export default getEndpoint;
