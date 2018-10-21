/**
 * External dependencies
 */
import { upperFirst, camelCase, reduce, isMap } from 'lodash';
import pluralize from 'pluralize';
import { mapReducer } from '@eventespresso/eejs';

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
 * @param {Map|Object} existingEntities
 * @param {Map|Object} incomingEntities
 * @return {Object} A new collection of entities.
 */
export const keepExistingEntitiesInObject = (
	existingEntities,
	incomingEntities,
) => {
	const hasThenGetEntity = ( defaultEntity, entityId ) => {
		if ( isMap( existingEntities ) && existingEntities.has( entityId ) ) {
			return existingEntities.get( entityId );
		}
		return existingEntities[ entityId ] || defaultEntity;
	};
	const reduceCallback = ( mapped, entity, entityId ) => {
		mapped.set( entityId, hasThenGetEntity( entity, entityId ) );
		return mapped;
	};
	return isMap( incomingEntities ) ?
		mapReducer( incomingEntities, reduceCallback, new Map() ) :
		reduce( incomingEntities, reduceCallback, new Map() );
};
