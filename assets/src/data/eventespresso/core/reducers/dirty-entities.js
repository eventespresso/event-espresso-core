/**
 * External imports
 */
import { DEFAULT_CORE_STATE } from '@eventespresso/model';
import { without } from 'lodash';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { types } = ACTION_TYPES.entities;

/**
 * Reducer for queuing an entity for deletion in the state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {DEFAULT_CORE_STATE.dirty.delete|{}} Existing or new state.
 */
export function deleteEntity( state = DEFAULT_CORE_STATE.dirty.delete, action ) {
	const { type, modelName, entityId } = action;

	switch ( type ) {
		case types.RECEIVE_DELETE_ENTITY_ID:
			state = {
				...state,
				[ modelName ]: [
					...state[ modelName ],
					entityId,
				],
			};
			break;
		case types.REMOVE_DELETE_ENTITY_ID:
			if (
				state[ modelName ] &&
				state[ modelName ].indexOf( entityId ) > -1
			) {
				state[ modelName ] = without( state[ modelName ], entityId );
				if ( state[ modelName ].length === 0 ) {
					delete state[ modelName ];
				}
			}
			break;
	}
	return state;
}

/**
 * Reducer for queueing the entity for trashing in the state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {DEFAULT_CORE_STATE.dirty.trash|{}} Existing or new state.
 */
export function trashEntity( state = DEFAULT_CORE_STATE.dirty.trash, action ) {
	const { type, modelName, entityId } = action;

	switch ( type ) {
		case types.RECEIVE_TRASH_ENTITY_ID:
			state = {
				...state,
				[ modelName ]: [
					...state[ modelName ],
					entityId,
				],
			};
			break;
		case types.REMOVE_TRASH_ENTITY_ID:
			if (
				state[ modelName ] &&
				state[ modelName ].indexOf( entityId ) > -1
			) {
				state[ modelName ] = without( state[ modelName ], entityId );
				if ( state[ modelName ].length === 0 ) {
					delete state[ modelName ];
				}
			}
			break;
	}
	return state;
}
