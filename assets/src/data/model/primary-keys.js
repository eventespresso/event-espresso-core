/**
 * External imports
 */
import { data } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { isArray, reduce, trimEnd, keyBy, forEach } from 'lodash';
import memoize from 'memize';

/**
 * Internal imports
 */
import {
	assertEntityHasKey,
	assertIsArray,
	assertIsNotEmpty,
} from './assertions';

/**
 * Exposes a map of modelname to primary key exposed by the eejs.data global
 * via the server.
 *
 * @type {{}}
 */
export const { primary_keys: primaryKeys = {} } = data.paths;

/**
 * Returns the values for the given keys from the provided entity.
 * This function would be used for models that have combined primary keys
 * (delivered as an array).
 *
 * @type { memoized }
 * @return { string } The string representation for the values.
 * @throws { Exception }
 */
export const valuesForCombinedPrimaryKeys = memoize( ( keys, entity ) => {
	assertIsArray( keys );
	const primaryKey = reduce( keys, function( result, key ) {
		assertEntityHasKey( key, entity );
		return entity[ result ] + ':' + entity[ key ];
	} );
	return trimEnd( primaryKey, ':' );
} );

/**
 * Returns the value for the given key from the provided entity.
 * This function would be used for models that have only one primary key.
 *
 * @type {memoized}
 * @return { number } The value for the key in the provided entity.
 * @throws { Exception }
 */
export const valueForPrimaryKey = memoize( ( key, entity ) => {
	assertEntityHasKey( key, entity );
	return entity[ key ];
} );

/**
 * Returns the primary key (or combined primary keys) from the available data.
 *
 * @type {memoized}
 * @return { string|Array }
 * @throws { Exception }
 */
export const getPrimaryKey = memoize( ( modelName ) => {
	assertEntityHasKey( modelName, primaryKeys );
	return primaryKeys[ modelName ];
} );

/**
 * Returns the values for the primary keys from the provided entity.
 *
 * @type {memoized}
 * @return { string }  If the model has only one primary key then the value will
 * be a simple string.  If the model has combined primary keys, then the value
 * will be as string in the format `%s.%s` for the primary key values.
 * @throws { Exception }
 */
export const getEntityPrimaryKeyValues = memoize( ( modelName, entity ) => {
	const keys = getPrimaryKey( modelName );
	return isArray( keys ) ?
		valuesForCombinedPrimaryKeys( keys, entity ) :
		valueForPrimaryKey( keys, entity );
} );

/**
 * This receives an array of entities and returns a collection of those same
 * entities indexed by the primary key value for each entity.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {*}  A collection indexed by the primary key values for each entity.
 * @throws { Exception }
 */
export const keyEntitiesByPrimaryKeyValue = ( modelName, entities = [] ) => {
	assertIsNotEmpty(
		entities,
		__(
			'The provided array of entities must not be empty',
			'event_espresso',
		)
	);
	assertIsArray( entities );
	return keyBy( entities, function( entity ) {
		return String( getEntityPrimaryKeyValues( modelName, entity ) );
	} );
};

/**
 * Creates an array of entity instances using the given factory and array
 * of entity values.
 *
 * @param {Object} factory
 * @param {Object} entities
 * @return {Object<number|Object>}  An array of entity instances indexed by
 * their primary key value
 */
export const createAndKeyEntitiesByPrimaryKeyValue = (
	factory,
	entities = {}
) => {
	assertIsNotEmpty(
		entities,
		__(
			'The provided object of entities must not be empty',
			'event_espresso',
		)
	);
	const entityInstances = {};
	forEach( entities, ( entity, entityId ) => {
		entityInstances[ entityId ] = factory.fromExisting( entity );
	} );
	return entityInstances;
};
