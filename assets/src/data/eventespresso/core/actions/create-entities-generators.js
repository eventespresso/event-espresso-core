/**
 * External imports
 */
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { singularModelName } from '@eventespresso/model';

/**
 * Internal imports
 */
import { resolveSelect, dispatch } from '../../base-controls';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../constants';

/**
 * Returns an action generator for creating a model entity instance and
 * including it in an action object for adding to state.
 *
 * @param {string} modelName  The name of the model the incoming object is for.
 * @param {Object} entityData  A plain object containing the entity properties and
 * values
 * @return {null|Object}  If the entity is successfully created the model entity
 * instance is returned, otherwise null.
 */
export function * hydrateEntity( modelName, entityData ) {
	modelName = singularModelName( modelName );
	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		modelName
	);
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const entityInstance = factory.fromExisting( entityData );
	yield dispatch(
		CORE_REDUCER_KEY,
		'receiveEntityAndResolve',
		entityInstance
	);
	return entityInstance;
}

/**
 * Returns an action generator for creating a model entity instance and
 * including it in an action object for adding to state.
 *
 * @param {string} modelName  The name of the model the incoming object is for.
 * @param {Object} entityData  A plain object containing the entity properties and
 * values
 * @return {null|Object}  If the entity is successfully created the model entity
 * instance is returned, otherwise null.
 */
export function* createEntity( modelName, entityData ) {
	modelName = singularModelName( modelName );
	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		modelName
	);
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const entityInstance = factory.createNew( entityData );
	yield dispatch(
		CORE_REDUCER_KEY,
		'receiveEntityAndResolve',
		entityInstance
	);
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
	yield dispatch(
		CORE_REDUCER_KEY,
		'receiveEntity',
		entity
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		CORE_REDUCER_KEY,
		'getEntityById',
		[ entity.modelName.toLowerCase(), entity.id ]
	);
}

/**
 * Same as receivesEntityAndResolve except this handles multiple entities.
 * @param {string} modelName
 * @param {Array<BaseEntity>}entities
 */
export function* receiveEntitiesAndResolve( modelName, entities ) {
	modelName = singularModelName( modelName );
	const entityIds = entities.map(
		( entity ) => {
			assertIsModelEntity( entity );
			return entity.id;
		}
	);
	while ( entityIds.length > 0 ) {
		yield dispatch(
			'core/data',
			'finishResolution',
			CORE_REDUCER_KEY,
			'getEntityById',
			[ modelName, entityIds.pop() ]
		);
	}
	yield dispatch(
		CORE_REDUCER_KEY,
		'receiveEntityRecords',
		modelName,
		entities,
	);
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
