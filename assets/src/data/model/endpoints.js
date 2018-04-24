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

export const applyQueryString = ( modelName, queryString ) => {
	return getEndpoint( modelName ) + '?' + queryString;
};

export default getEndpoint;
