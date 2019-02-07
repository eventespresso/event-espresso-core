/**
 * External imports
 */
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import {
	getFactoryByModel,
	resolveGetEntityByIdForIds,
} from '../../base-resolvers';
import { receiveEntity, receiveEntityRecords } from './receive-entities';

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
	yield receiveEntityAndResolve( entityInstance );
	return entityInstance;
}

/**
 * Generator for yielding actions for both receiving a
 * BaseEntity instance and resolving the related selector for retrieving that
 * entity instance.
 *
 * @param {BaseEntity} entity
 */
export function* receiveEntityAndResolve( entity ) {
	assertIsModelEntity( entity );
	yield receiveEntity( entity );
	yield resolveGetEntityByIdForIds(
		entity.modelName.toLowerCase(),
		[ entity.id ]
	);
}

/**
 * Same as receivesEntityAndResolve except this handles multiple entities.
 * @param {string} modelName
 * @param {Array<BaseEntity>}entities
 */
export function* receiveEntitiesAndResolve( modelName, entities ) {
	yield resolveGetEntityByIdForIds(
		modelName,
		entities.map(
			( entity ) => {
				assertIsModelEntity( entity );
				return entity.id;
			}
		)
	);
	yield receiveEntityRecords( modelName, entities );
}

/**
 * Asserts whether the given value is a model entity and throws
 * InvalidModelEntity if it is not.
 *
 * @param {BaseEntity} entity
 * @throws InvalidModelEntity
 */
function assertIsModelEntity( entity ) {
	if ( ! isModelEntity( entity ) ) {
		throw new InvalidModelEntity(
			'receiveEntityIdAndResolve expects an instance of BaseEntity',
			entity,
		);
	}
}
