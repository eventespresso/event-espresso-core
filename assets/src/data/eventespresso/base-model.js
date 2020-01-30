/**
 * External dependencies
 */
import { upperFirst, camelCase, reduce, isMap, isNaN } from 'lodash';
import pluralize from 'pluralize';
import { mapReducer } from '@eventespresso/helpers';

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
 * Incoming collections can be Maps or plain objects.
 *
 * Note if incomingEntities is a Map, the ORDER of the map will be preserved
 * even if the values of entities in the map are replaced by values from
 * existing entities.
 *
 * @param {Map|Object} existingEntities
 * @param {Map|Object} incomingEntities
 * @return {Map} A new collection of entities. Note if existing entities came in
 * as a plain object, this returns a Map.
 */
export const keepExistingEntitiesInObject = (
	existingEntities,
	incomingEntities,
) => {
	const getExistingOrDefaultEntity = ( defaultEntity, entityId ) => {
		if ( isMap( existingEntities ) && existingEntities.has( entityId ) ) {
			return existingEntities.get( entityId );
		}
		return existingEntities[ entityId ] || defaultEntity;
	};
	const reduceCallback = ( mapped, entity, entityId ) => {
		entityId = normalizeEntityId( entityId );
		mapped.set( entityId, getExistingOrDefaultEntity( entity, entityId ) );
		return mapped;
	};
	return isMap( incomingEntities ) ?
		mapReducer( incomingEntities, reduceCallback, new Map() ) :
		reduce( incomingEntities, reduceCallback, new Map() );
};

/**
 * This normalizes numeric values to integer numbers and leaves non numeric
 * values alone.
 *
 * @param {*} entityId
 * @return {*} Normalized value
 */
const normalizeEntityId = ( entityId ) => {
	const originalId = entityId;
	entityId = parseInt( entityId, 10 );
	return isNaN( entityId ) ? originalId : entityId;
};
