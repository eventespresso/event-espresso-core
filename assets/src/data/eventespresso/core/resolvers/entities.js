/**
 * External imports
 */
import {
	getPrimaryKey,
	applyQueryString,
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
} from '@eventespresso/model';
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';

/**
 * Internal Imports
 */
import { fetch } from '../../base-controls';
import { getFactoryByModel } from '../../base-resolvers';
import { receiveEntityRecords } from './../actions';

/**
 * A resolver for getting an entity for the given model name and entity id.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {null|BaseEntity} If successfully retrieved, the entity,
 * otherwise null.
 */
export function* getEntityById( modelName, entityId ) {
	const primaryKeyForModel = getPrimaryKey( modelName );
	let entity = yield fetch( {
		path: applyQueryString(
			modelName,
			primaryKeyForModel + '=' + entityId
		),
	} );
	entity = keyEntitiesByPrimaryKeyValue( modelName, [ entity ] );
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const fullEntity = createAndKeyEntitiesByPrimaryKeyValue( factory, entity );
	yield receiveEntityRecords( modelName, fullEntity );
	return entity[ entityId ];
}
