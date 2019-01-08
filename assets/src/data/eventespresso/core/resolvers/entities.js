/**
 * External imports
 */
import { getEndpoint } from '@eventespresso/model';
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
	const entity = yield fetch( {
		path: getEndpoint( modelName ) + '/' + entityId,
	} );
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const fullEntity = factory.fromExisting( entity );
	yield receiveEntityRecords( modelName, [ fullEntity ] );
	return fullEntity;
}
