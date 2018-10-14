/**
 * External dependencies
 */
import { upperFirst, camelCase } from 'lodash';
import pluralize from 'pluralize';

/**
 * A helper for getting a method name.
 * @param {string} modelName
 * @param {string} suffix
 * @param {string} prefix
 * @param {boolean} usePlural
 * @return {string} Returns a name for a method.
 */
export const getMethodName = (
	modelName,
	suffix = '',
	prefix = 'get',
	usePlural = false
) => {
	modelName = usePlural ? pluralize( modelName ) : modelName;
	return prefix + upperFirst( camelCase( modelName + upperFirst( suffix ) ) );
};
