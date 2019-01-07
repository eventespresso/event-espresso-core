/**
 * External Imports
 */
import {
	pluralModelName,
	createEntityFactory,
	MODEL_PREFIXES,
} from '@eventespresso/model';

/**
 * Internal imports
 */
import { getSchemaForModel } from './schema/resolvers';
import { select, dispatch } from './base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from './core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from './schema/constants';

/**
 * Returns the factory for the given model from the eventespresso/schema store.
 *
 * @param {string} modelName
 * @return {IterableIterator<*>|Object|null} A generator or the object once the
 * factory is retrieved.
 */
export function* getFactoryByModel( modelName ) {
	let factory;
	const resolved = yield select(
		SCHEMA_REDUCER_KEY,
		'hasResolvedFactoryForModel',
		modelName
	);
	if ( resolved === true ) {
		factory = yield select(
			SCHEMA_REDUCER_KEY,
			'getFactoryForModel',
			modelName
		);
		return factory;
	}
	const schema = yield getSchemaByModel( modelName );
	if ( ! schema ) {
		return null;
	}
	factory = createEntityFactory(
		modelName,
		schema.schema,
		MODEL_PREFIXES( modelName )
	);
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveFactoryForModel',
		modelName,
		factory,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		[ modelName ]
	);
	return factory;
}

/**
 * Returns the schema for the given model from the eventespresso/schema store.
 *
 * @param {string} modelName
 * @return {IterableIterator<*>|Object} A generator of the object once the
 * schema is retrieved.
 */
export function* getSchemaByModel( modelName ) {
	let schema;
	const resolved = yield select(
		SCHEMA_REDUCER_KEY,
		'hasResolvedSchemaForModel',
		modelName
	);
	if ( resolved === true ) {
		schema = yield select(
			SCHEMA_REDUCER_KEY,
			'getSchemaForModel',
			modelName
		);
		return schema;
	}
	schema = yield getSchemaForModel( modelName );
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveSchemaForModel',
		modelName,
		schema,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'getSchemaForModel',
		[ modelName ]
	);
	return schema;
}

/**
 * Handles ensuring that the resolution state for the `getEntityById` for all
 * provided entityIds is recorded as finished.
 *
 * @param {string} modelName
 * @param {Array} entityIds
 */
export function* resolveGetEntityByIdForIds( modelName, entityIds ) {
	while ( entityIds.length > 0 ) {
		yield dispatch(
			'core/data',
			'finishResolution',
			CORE_REDUCER_KEY,
			'getEntityById',
			[ modelName, entityIds.shift() ]
		);
	}
}

/**
 * This ensures that resolution state for the opposite query on retrieving
 * relations is set to finished to prevent unnecessary server queries.
 *
 * @param {BaseEntity} entity
 * @param {Map} relationEntities
 * @param {Array<number>} relationIds
 */
export function* resolveGetRelatedEntities(
	entity,
	relationEntities,
	relationIds
) {
	while ( relationIds.length > 0 ) {
		const relationEntity = relationEntities.get( relationIds.shift() );
		if ( relationEntity ) {
			yield dispatch(
				'core/data',
				'finishResolution',
				CORE_REDUCER_KEY,
				'getRelatedEntities',
				[ relationEntity, pluralModelName( entity.modelName ) ]
			);
		}
	}
}
