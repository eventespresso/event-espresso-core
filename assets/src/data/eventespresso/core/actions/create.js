/**
 * External imports
 */
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { getFactoryByModel } from '../../base-resolvers';
import { receiveEntity } from './receive';

export function* createEntity( modelName, entity ) {
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return entity;
	}
	const entityInstance = factory.createNew( entity );
	yield receiveEntity( modelName, entityInstance );
	return entityInstance;
}
