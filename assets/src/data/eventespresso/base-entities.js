/**
 * External dependencies
 */
import { upperFirst, camelCase } from 'lodash';
import pluralize from 'pluralize';

export const getMethodName = (
	modelName,
	suffix = '',
	prefix = 'get',
	usePlural = false
) => {
	modelName = usePlural ? pluralize( modelName ) : modelName;
	return prefix + upperFirst( camelCase( modelName + upperFirst( suffix ) ) );
};
