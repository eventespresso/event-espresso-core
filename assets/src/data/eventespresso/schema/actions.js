/**
 * Internal imports
 */
import { ACTION_TYPES as types } from './action-types';
import {
	REDUCER_KEY as SCHEMA_REDUCER_KEY,
} from './constants';
import { dispatch } from '../base-controls';

/**
 * Returns an action object used to update the store with the provided schema
 * for the provided modelName.
 *
 * @param {string} modelName
 * @param {Object} schema
 * @return {{type: string, modelName: *, schema}}  The action object.
 */
export function receiveSchemaForModel( modelName, schema = {} ) {
	return {
		type: types.RECEIVE_SCHEMA_RECORD,
		modelName,
		schema,
	};
}

export function* receiveSchemaForModelAndResolve( modelName, schema = {} ) {
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveSchemaForModel',
		modelName,
		schema
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'getSchemaForModel',
		[ modelName.toLowerCase() ]
	);
	return schema;
}

/**
 * Returns an action object used to update the store with the provided model
 * entity factory for the provided modelName.
 *
 * @param {string} modelName
 * @param {Object} factory
 * @return {{type: string, modelName: string, factory: Object}} An action
 * object.
 */
export function receiveFactoryForModel( modelName, factory = {} ) {
	return {
		type: types.RECEIVE_FACTORY_FOR_MODEL,
		modelName,
		factory,
	};
}

export function* receiveFactoryForModelAndResolve( modelName, factory = {} ) {
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveFactoryForModel',
		modelName,
		factory
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		[ modelName.toLowerCase() ]
	);
	return factory;
}

/**
 * Returns an action object used to update the store with the provided relation
 * endpoint for the model and id, and its relations.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {string} endpoint
 * @return {
 * 	{
 * 		modelName: *,
 * 		endpoint: *,
 * 		relationName: *,
 * 		entityId: *,
 * 		type: string
 * 	}
 * } An action object.
 */
export function receiveRelationEndpointForModelEntity(
	modelName,
	entityId,
	relationName,
	endpoint
) {
	return {
		type: types.RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY,
		modelName,
		entityId,
		relationName,
		endpoint,
	};
}

export function receiveRelationSchema(
	modelName,
	relationName,
	relationSchema
) {
	return {
		type: types.RECEIVE_RELATION_SCHEMA,
		modelName,
		relationName,
		relationSchema,
	};
}

export function* receiveRelationSchemaAndResolve(
	modelName,
	relationName,
	relationSchema
) {
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveRelationSchema',
		modelName,
		relationName,
		relationSchema
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'getRelationSchema',
		[ modelName.toLowerCase(), relationName ]
	);
}
