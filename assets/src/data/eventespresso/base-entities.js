/**
 * External dependencies
 */
import { upperFirst, camelCase, reduce } from 'lodash';
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

/**
 * Given a collection of existing entities and a collection of incoming
 * entities, this returns a merged object with preference given to common
 * entities from the existingEntities collection.
 *
 * @param {Object} existingEntities
 * @param {Object} incomingEntities
 * @return {Object} A new collection of entities.
 */
export const keepExistingEntitiesInObject = (
	existingEntities,
	incomingEntities,
) => {
	return reduce( incomingEntities, ( result, entity, entityId ) => {
		result[ entityId ] = existingEntities[ entityId ] ?
			existingEntities[ entityId ] :
			entity;
		return result;
	}, {} );
};
