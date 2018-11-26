/**
 * External imports
 */
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { getFactoryByModel } from '../../base-resolvers';
import { receiveEntity } from './receive-entities';

/**
 * Returns an action generator for creating a model entity instance and
 * including it in an action object for adding to state.
 *
 * @param {string} modelName  The name of the model the incoming object is for.
 * @param {Object} entity  A plain object containing the entity properties and
 * values
 * @return {null|Object}  If the entity is successfully created the model entity
 * instance is returned, otherwise null.
 */
export function* createEntity( modelName, entity ) {
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const entityInstance = factory.createNew( entity );
	yield receiveEntity( modelName, entityInstance );
	return entityInstance;
}
