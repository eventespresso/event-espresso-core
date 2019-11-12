import {
	modelNameForQueryString,
	singularModelName,
} from '@eventespresso/model';
import { castArray } from 'lodash';
import { addQueryArgs } from '@wordpress/url';

/**
 * Appends provided calculated fields to the provided path if not empty.
 *
 * Also, if modelName is supplied, then any fields will be
 * suffixed with the modelName as a part of the query to
 * indicate what model the calculated fields apply to.
 * Otherwise they are appended without modification.
 *
 * @param {string} path
 * @param {Array<string>} calculatedFields
 * @param {string} modelName
 * @return {string} The path with calculated fields appended if present.
 */
export const appendCalculatedFieldsToPath = (
	path,
	calculatedFields,
	modelName = ''
) => {
	calculatedFields = castArray( calculatedFields );
	if ( calculatedFields.length > 0 ) {
		// setup fields string
		const nameForQueryString = modelName !== '' ?
			modelNameForQueryString( singularModelName( modelName ) ) :
			'';
		const queryStrings = nameForQueryString ?
			calculatedFields.map(
				( field ) => {
					return `${ nameForQueryString }.${ field }`;
				},
			) :
			calculatedFields;
		path = addQueryArgs( path, { calculate: queryStrings.join() } );
	}
	return path;
};
