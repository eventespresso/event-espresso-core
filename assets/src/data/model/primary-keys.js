/**
 * External imports
 */
import { data, exception as GeneralException } from '@eventespresso/eejs';
import { isArray, reduce, trimEnd, keyBy, isEmpty } from 'lodash';
import memoize from 'memize';

/**
 * Internal imports
 */
import { validateEntityHasKey } from './validators';

export const { primary_keys: primaryKeys = {} } = data.paths;

export const valuesForCombinedPrimaryKeys = memoize( ( keys, entity ) => {
	if ( ! isArray( keys ) ) {
		throw new GeneralException(
			__( 'The provided value is not an array.', 'event_espresso' ),
		);
	}
	const primaryKey = reduce( keys, function( result, key ) {
		validateEntityHasKey( key, entity );
		return result + '.' + key;
	} );
	return trimEnd( primaryKey, '.' );
} );

export const valueForPrimaryKey = memoize( ( key, entity ) => {
	validateEntityHasKey( key, entity );
	return entity[ key ];
} );

export const getPrimaryKey = memoize( ( modelName ) => {
	validateEntityHasKey( modelName, primaryKeys );
	return primaryKeys[ modelName ];
} );

export const getEntityPrimaryKeyValues = memoize( ( modelName, entity ) => {
	const keys = getPrimaryKey( modelName );
	return isArray( keys ) ?
		valuesForCombinedPrimaryKeys( keys, entity ) :
		valueForPrimaryKey( keys, entity );
} );

export const keyEntitiesByPrimaryKeyValue = ( modelName, entities = [] ) => {
	if ( isEmpty( entities ) ) {
		throw new GeneralException(
			__( 'The provided array of entities must not be empty', 'event_espresso' )
		);
	}
	return keyBy( entities, function( entity ) {
		return String( getEntityPrimaryKeyValues( modelName, entity ) );
	} );
};
