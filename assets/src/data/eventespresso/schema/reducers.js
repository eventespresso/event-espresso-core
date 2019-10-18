/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';
import { normalizeEntityId } from '@eventespresso/helpers';
import { DEFAULT_SCHEMA_STATE, singularModelName } from '@eventespresso/model';
import {
	isSchemaResponseOfModel,
	isModelEntityFactoryOfModel,
} from '@eventespresso/validators';
import { fromJS, Map } from 'immutable';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Internal imports
 */
import { ACTION_TYPES as types } from './action-types';

/**
 * Reducer for a model schema.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} The new (or original) state.
 */
export const receiveSchema = (
	state = fromJS( DEFAULT_SCHEMA_STATE.schema ),
	action
) => {
	const { type, schema } = action;
	try {
		const modelName = singularModelName( action.modelName );
		if (
			isSchemaResponseOfModel( schema, modelName ) &&
			type === types.RECEIVE_SCHEMA_RECORD
		) {
			return state.set( modelName, schema );
		}
	} catch ( e ) {
		return state;
	}
	return state;
};

/**
 * Reducer for a model factory
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} the new (or original) state.
 */
export const receiveFactory = (
	state = fromJS( DEFAULT_SCHEMA_STATE.factory ),
	action
) => {
	const { type, factory } = action;
	try {
		const modelName = singularModelName( action.modelName );
		if (
			isModelEntityFactoryOfModel( factory, modelName ) &&
			type === types.RECEIVE_FACTORY_FOR_MODEL
		) {
			return state.set( modelName, factory );
		}
	} catch ( e ) {
		return state;
	}
	return state;
};

/**
 * Reducer for relation endpoints.
 *
 * @param {Map}state
 * @param {Object} action
 * @return {Map} New or original state.
 */
export const receiveRelationEndpointForEntity = (
	state = fromJS( DEFAULT_SCHEMA_STATE.relationEndpoints ),
	action
) => {
	try {
		const { type, entityId, endpoint } = action;
		const modelName = singularModelName( action.modelName );
		const relationName = singularModelName( action.relationName );
		if ( type === types.RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY ) {
			return state.setIn(
				[ modelName, normalizeEntityId( entityId ), relationName ],
				endpoint
			);
		}
	} catch ( e ) {
		return state;
	}
	return state;
};

/**
 * Reducer for relation schema
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} New or original state
 */
export const receiveRelationSchema = ( state = Map(), action ) => {
	if ( action.type === types.RECEIVE_RELATION_SCHEMA ) {
		const modelName = singularModelName( action.modelName );
		const relationName = singularModelName( action.relationName );
		if ( isShallowEqual(
			state.getIn( [ modelName, relationName ], {} ),
			action.relationSchema,
		) ) {
			return state;
		}
		return state.setIn(
			[ modelName, relationName ],
			action.relationSchema
		);
	}
	return state;
};

/**
 * Be aware that the root state is a plain object but each slice ('schema',
 * 'factory', 'relationEndpoints') is an immutable Map.
 */
export default combineReducers( {
	schema: receiveSchema,
	factory: receiveFactory,
	relationEndpoints: receiveRelationEndpointForEntity,
	relationSchema: receiveRelationSchema,
} );
