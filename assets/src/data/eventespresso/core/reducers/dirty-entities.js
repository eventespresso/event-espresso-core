/**
 * External imports
 */
import { DEFAULT_CORE_STATE } from '@eventespresso/model';
import { toInteger } from 'lodash';
import { fromJS, List } from 'immutable';
import cuid from 'cuid';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { entities: types } = ACTION_TYPES;

/**
 * Handle adding incoming data to state.
 *
 * @param {Map} state
 * @param {string} modelName
 * @param {number} entityId
 * @param {List} existingEntities
 * @return {Map} New state.
 */
const addToState = ( state, modelName, entityId, existingEntities ) => {
	existingEntities = existingEntities.push( entityId );
	return state.set( modelName, existingEntities );
};

/**
 * Handle removing incoming data from state
 *
 * @param {Map} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @return {Map} new state or existing state if no change.
 */
const removeFromState = ( state, modelName, entityId ) => {
	let entityIds = state.get( modelName ) || List();
	if ( ! entityIds.contains( entityId ) ) {
		return state;
	}
	entityIds = entityIds.delete(
		entityIds.indexOf( entityId )
	);
	return entityIds.isEmpty() ?
		state.delete( modelName ) :
		state.set( modelName, entityIds );
};

/**
 * Processes the incoming action
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} Either the existing state if no change or new state.
 */
const processAction = ( state, action ) => {
	const { type, modelName } = action;
	const entityId = cuid.isCuid( action.entityId ) ?
		action.entityId :
		toInteger( action.entityId );
	const existingEntities = state.get( modelName ) || List();

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
};

/**
 * Reducer for queuing an entity for deletion in the state.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} Existing or new state.
 */
export function deleteEntity(
	state = fromJS( DEFAULT_CORE_STATE.dirty.delete ),
	action
) {
	return processAction( state, action );
}

/**
 * Reducer for queueing the entity for trashing in the state.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} Existing or new state.
 */
export function trashEntity(
	state = fromJS( DEFAULT_CORE_STATE.dirty.trash ),
	action
) {
	return processAction( state, action );
}
