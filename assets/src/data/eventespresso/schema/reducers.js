/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { isUndefined } from 'lodash';

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
	return ! isUndefined( state.schema ) &&
		! isUndefined( state.schema[ modelName ] ) &&
		isShallowEqual( state.schema[ modelName ], schema );
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
	return ! isUndefined( state.factory ) &&
		! isUndefined( state.factory[ modelName ] ) &&
		isShallowEqual( state.factory[ modelName ], factory );
};

/**
 * Reducer for a model schema.
 * @param {Object} state
 * @param {Object} action
 * @return {Object} The reduced (or original) state.
 */
export const receiveSchema = ( state = DEFAULT_SCHEMA_STATE, action ) => {
	const { type, modelName, schema } = action;
	if (
		type === 'RECEIVE_SCHEMA_RECORD' &&
		! hasSameSchema( state, modelName, schema )
	) {
		return {
			...state,
			schema: {
				...state.schema,
				[ modelName ]: schema,
			},
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
export const receiveFactory = ( state = DEFAULT_SCHEMA_STATE, action ) => {
	const { type, modelName, factory } = action;
	if (
		type === 'RECEIVE_FACTORY_FOR_MODEL' &&
		! hasSameFactory( state, modelName, factory )
	) {
		return {
			...state,
			factory: {
				...state.factory,
				[ modelName ]: factory,
			},
		};
	}
	return state;
};

export default combineReducers(
	{
		receiveSchema,
		receiveFactory,
	}
);
