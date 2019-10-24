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
import { ACTION_TYPES } from './action-types';

// setup initial state objects
const DEFAULT_STATE_SCHEMA = fromJS( DEFAULT_SCHEMA_STATE.schema );
const DEFAULT_STATE_FACTORY = fromJS( DEFAULT_SCHEMA_STATE.factory );
const DEFAULT_STATE_ENDPOINTS = fromJS( DEFAULT_SCHEMA_STATE.relationEndpoints );
const DEFAULT_STATE_RELATIONS = fromJS( DEFAULT_SCHEMA_STATE.relationSchema );

/**
 * Reducer for a model schema.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} The new (or original) state.
 */
export const receiveSchema = ( state = DEFAULT_STATE_SCHEMA, action ) => {
	try {
		if ( action.type === ACTION_TYPES.RECEIVE_SCHEMA_RECORD ) {
			const modelName = singularModelName( action.modelName );
			if ( isSchemaResponseOfModel( action.schema, modelName ) ) {
				return state.set( modelName, action.schema );
			}
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
export const receiveFactory = ( state = DEFAULT_STATE_FACTORY, action ) => {
	try {
		if ( action.type === ACTION_TYPES.RECEIVE_FACTORY_FOR_MODEL ) {
			const modelName = singularModelName( action.modelName );
			if ( isModelEntityFactoryOfModel( action.factory, modelName ) ) {
				return state.set( modelName, action.factory );
			}
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
	state = DEFAULT_STATE_ENDPOINTS,
	action
) => {
	try {
		if ( action.type === ACTION_TYPES.RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY ) {
			const modelName = singularModelName( action.modelName );
			const relationName = singularModelName( action.relationName );
			return state.setIn(
				[
					modelName,
					normalizeEntityId( action.entityId ),
					relationName
				],
				action.endpoint
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
export const receiveRelationSchema = (
	state = DEFAULT_STATE_RELATIONS,
	action
) => {
	if ( action.type === ACTION_TYPES.RECEIVE_RELATION_SCHEMA ) {
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
