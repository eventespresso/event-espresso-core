/**
 * External imports
 */
import { DEFAULT_CORE_STATE } from '@eventespresso/model';
import { fromJS, Set } from 'immutable';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { entities: types } = ACTION_TYPES;

/**
 * Handle adding incoming data to state.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {number} entityId
 * @param {Immutable.Set} existingEntities
 * @return {Immutable.Map} New state.
 */
const addToState = ( state, modelName, entityId, existingEntities ) => {
	existingEntities = existingEntities.add( entityId );
	return state.set( modelName, existingEntities );
};

/**
 * Handle removing incoming data from state
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @return {Immutable.Map} new state or existing state if no change.
 */
const removeFromState = ( state, modelName, entityId ) => {
	let entityIds = state.get( modelName, Set() );
	if ( ! entityIds.includes( entityId ) ) {
		return state;
	}
	entityIds = entityIds.delete(
		entityIds.keyOf( entityId )
	);
	return entityIds.isEmpty() ?
		state.delete( modelName ) :
		state.set( modelName, entityIds );
};

/**
 * Processes the incoming action
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Either the existing state if no change or new state.
 */
const processAction = ( state, action ) => {
	const { type, modelName } = action;
	const entityId = normalizeEntityId( action.entityId );
	const existingEntities = state.get( modelName, Set() );

	switch ( type ) {
		case types.RECEIVE_DELETE_ENTITY_ID:
		case types.RECEIVE_TRASH_ENTITY_ID:
			state = addToState( state, modelName, entityId, existingEntities );
			break;
		case types.REMOVE_DELETE_ENTITY_ID:
		case types.REMOVE_TRASH_ENTITY_ID:
			state = removeFromState( state, modelName, entityId );
			break;
	}
	return state;
};

/**
 * Reducer for queuing an entity for deletion in the state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Existing or new state.
 */
export function deleteEntity(
	state = fromJS( DEFAULT_CORE_STATE.dirty.delete ),
	action
) {
	return action.type === types.RECEIVE_DELETE_ENTITY_ID ||
		action.type === types.REMOVE_DELETE_ENTITY_ID ?
		processAction( state, action ) :
		state;
}

/**
 * Reducer for queueing the entity for trashing in the state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Existing or new state.
 */
export function trashEntity(
	state = fromJS( DEFAULT_CORE_STATE.dirty.trash ),
	action
) {
	return action.type === types.RECEIVE_TRASH_ENTITY_ID ||
		action.type === types.REMOVE_TRASH_ENTITY_ID ?
		processAction( state, action ) :
		state;
}
