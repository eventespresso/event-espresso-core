/**
 * Internal imports
 */
import { getFactoryForModel, getSchemaForModel } from './schema/resolvers';
import { select, dispatch } from './base-controls';

/**
 * Returns the factory for the given model from the eventespresso/schema store.
 *
 * @param {string} modelName
 * @return {IterableIterator<*>|Object} A generator or the object once the
 * factory is retrieved.
 */
export function* getFactoryByModel( modelName ) {
	let factory;
	const resolved = yield select(
		'eventespresso/schema',
		'hasResolvedFactoryForModel',
		modelName
	);
	if ( resolved === true ) {
		factory = yield select(
			'eventespresso/schema',
			'getFactoryForModel',
			modelName
		);
		return factory;
	}
	const schema = yield getSchemaByModel( modelName );
	factory = yield getFactoryForModel( modelName, schema );
	yield dispatch(
		'eventespresso/schema',
		'receiveFactoryForModel',
		modelName,
		factory,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		'eventespresso/schema',
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
		'eventespresso/schema',
		'hasResolvedSchemaForModel',
		modelName
	);
	if ( resolved === true ) {
		schema = yield select(
			'eventespresso/schema',
			'getSchemaForModel',
			modelName
		);
		return schema;
	}
	schema = yield getSchemaForModel( modelName );
	yield dispatch(
		'eventespresso/schema',
		'receiveSchemaForModel',
		modelName,
		schema,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		'eventespresso/schema',
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
			'eventespresso/core',
			'getEntityById',
			[ modelName, entityIds.shift() ]
		);
	}
}
