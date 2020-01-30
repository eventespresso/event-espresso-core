/**
 * Internal imports
 */
import { primaryKeys } from './primary-keys.js';

/**
 * External imports
 */
import { keys, startCase } from 'lodash';
import pluralize from 'pluralize';
import memoize from 'memize';

/**
 * Returns an array of model names currently exposed for REST API request.
 */
export const MODEL_NAMES = keys( primaryKeys );

/**
 * Used to normalize the plural form of a given model name.
 * @param {string} modelName
 * @return {string}  Ensures the given modelName is its plural form.
 */
export const pluralModelName = memoize(
	( modelName ) => pluralize( modelName )
);

/**
 * Used to normalize the singular form of a given model name.
 * @param {string} modelName
 * @return {string} Ensures the given modelName is in its singular form.
 */
export const singularModelName = memoize(
	( modelName ) => pluralize.singular( modelName )
);

/**
 * Provides the capitalized snakecase format for the given model name typically
 * used in query strings.
 *
 * Example:
 *
 * modelNameForQueryString( 'message_template_group' );
 * // Message_Template_Group
 *
 * @param {string} modelName
 * @return {string} the formatted string.
 */
export const modelNameForQueryString = memoize(
	( modelName ) => {
		modelName = singularModelName( modelName );
		modelName = startCase( modelName );
		return modelName.replace( /\s/g, '_' );
	}
);
