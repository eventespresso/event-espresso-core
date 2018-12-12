/**
 * External imports
 */
import { DEFAULT_CORE_STATE } from '@eventespresso/model';
import { without, get, set, unset } from 'lodash';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { entities: types } = ACTION_TYPES;

/**
 * Handle adding incoming data to state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number} entityId
 * @param {Array} existingEntities
 * @return {Object} New state.
 */
const addToState = ( state, modelName, entityId, existingEntities ) => {
	state = { ...state };
	existingEntities.push( entityId );
	set( state, [ modelName ], existingEntities );
	return state;
};

/**
 * Handle removing incoming data from state
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number} entityId
 * @return {Object} New state
 */
const removeFromState = ( state, modelName, entityId ) => {
	state = { ...state };
	state[ modelName ] = without( state[ modelName ], entityId );
	if ( state[ modelName ].length === 0 ) {
		unset( state, [ modelName ] );
	}
	return state;
};

const processAction = ( state, action ) => {
	const { type, modelName, entityId } = action;
	const DEFAULT_EMPTY_ARRAY = [];
	const existingEntities = get( state, [ modelName ], DEFAULT_EMPTY_ARRAY );

	switch ( type ) {
		case types.RECEIVE_DELETE_ENTITY_ID:
		case types.RECEIVE_TRASH_ENTITY_ID:
			if ( existingEntities.indexOf( entityId ) > -1 ) {
				return state;
			}
			state = addToState( state, modelName, entityId, existingEntities );
			break;
		case types.REMOVE_DELETE_ENTITY_ID:
		case types.REMOVE_TRASH_ENTITY_ID:
			if ( existingEntities.indexOf( entityId ) > -1 ) {
				state = removeFromState( state, modelName, entityId );
			}
			break;
	}
	return state;
}

/**
 * Reducer for queuing an entity for deletion in the state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {DEFAULT_CORE_STATE.dirty.delete|{}} Existing or new state.
 */
export function deleteEntity( state = DEFAULT_CORE_STATE.dirty.delete, action ) {
	return processAction( state, action );
}

/**
 * Reducer for queueing the entity for trashing in the state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {DEFAULT_CORE_STATE.dirty.trash|{}} Existing or new state.
 */
export function trashEntity( state = DEFAULT_CORE_STATE.dirty.trash, action ) {
	return processAction( state, action );
}
