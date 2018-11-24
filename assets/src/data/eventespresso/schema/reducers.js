/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { isUndefined } from 'lodash';
import { pluralModelName } from '@eventespresso/model';
import {
	isSchemaResponseOfModel,
	isModelEntityFactoryOfModel,
} from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { DEFAULT_SCHEMA_STATE } from '../../model';

/**
 * Returns whether the provided schema already exists in the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Object} schema
 * @return {boolean}  true means it's already in the state.
 */
const hasSameSchema = ( state, modelName, schema ) => {
	return ! isUndefined( state ) &&
		! isUndefined( state[ modelName ] ) &&
		isShallowEqual( state[ modelName ], schema );
};

/**
 * Returns whether the provided model entity factory already exists in the
 * state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Object} factory
 * @return {boolean} true means it's already in the state.
 */
const hasSameFactory = ( state, modelName, factory ) => {
	return ! isUndefined( state ) &&
		! isUndefined( state[ modelName ] ) &&
		isShallowEqual( state[ modelName ], factory );
};

/**
 * Reducer for a model schema.
 * @param {Object} state
 * @param {Object} action
 * @return {Object} The reduced (or original) state.
 */
export const receiveSchema = ( state = DEFAULT_SCHEMA_STATE.schema, action ) => {
	const { type, modelName, schema } = action;
	if (
		isSchemaResponseOfModel( schema, modelName ) &&
		type === 'RECEIVE_SCHEMA_RECORD' &&
		! hasSameSchema( state, modelName, schema )
	) {
		return {
			...state,
			[ modelName ]: schema,
		};
	}
	return state;
};

/**
 * Reducer for a model factory
 * @param {Object} state
 * @param {Object} action
 * @return {Object} the reduced (or original) state.
 */
export const receiveFactory = (
	state = DEFAULT_SCHEMA_STATE.factory,
	action
) => {
	const { type, modelName, factory } = action;
	if (
		isModelEntityFactoryOfModel( factory, modelName ) &&
		type === 'RECEIVE_FACTORY_FOR_MODEL' &&
		! hasSameFactory( state, modelName, factory )
	) {
		return {
			...state,
			[ modelName ]: factory,
		};
	}
	return state;
};

export const receiveRelationEndpointForEntity = (
	state = DEFAULT_SCHEMA_STATE.relationEndpoints,
	action
) => {
	const { type, modelName, entityId, endpoint } = action;
	const relationName = pluralModelName( action.relationName );
	const relationEndpointData = state[ modelName ][ entityId ] ?
		{ ...state[ modelName ][ entityId ] } :
		{};
	if ( type === 'RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY' ) {
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				[ entityId ]: {
					...relationEndpointData,
					[ relationName ]: endpoint,
				},
			},
		};
	}
};

export default combineReducers( {
	schema: receiveSchema,
	factory: receiveFactory,
	relationEndpoints: receiveRelationEndpointForEntity,
} );
