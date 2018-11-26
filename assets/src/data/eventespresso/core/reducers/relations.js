/**
 * External imports.
 */
import { DEFAULT_CORE_STATE, pluralModelName } from '@eventespresso/model';
import {
	get,
	set,
	union,
	isEmpty,
	difference,
	pullAll,
	forEach,
	pull,
} from 'lodash';

/**
 * Internal Imports
 */
import { ACTION_TYPES } from '../actions/action-types';
const { types } = ACTION_TYPES.relations;
const DEFAULT_EMPTY_ARRAY = [];
const DEFAULT_EMPTY_OBJECT = {};

/**
 * Reducer for the relations state in the store.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either a new state or the existing state.
 */
export function receiveAndRemoveRelations( state, action ) {
	const {
		modelName,
		entityId,
		relationEntityIds,
		type,
	} = action;
	const relationName = pluralModelName( action.relationName );
	const existingIds = get(
		state,
		[ modelName, entityId, relationName ],
		DEFAULT_EMPTY_ARRAY,
	);
	const newState = { ...state };
	const allEntityIdsExist = isEmpty(
		difference(
			relationEntityIds,
			existingIds
		)
	);
	switch ( type ) {
		case types.RECEIVE_RELATED_ENTITY_IDS:
			if ( allEntityIdsExist ) {
				return state;
			}
			newState[ modelName ][ entityId ][ relationName ] = union(
				existingIds,
				relationEntityIds
			);
			return newState;
		case types.REMOVE_RELATED_ENTITY_IDS:
			const idsAfterRemoval = pullAll( relationEntityIds, existingIds );
			if ( idsAfterRemoval.length === existingIds.length ) {
				return state;
			}
			newState[ modelName ][ entityId ][ relationName ] = idsAfterRemoval;
			return newState;
	}
	return state;
}

/**
 * Reducer for handling entity ids in the relation that have a cuid that has been
 * updated with a new entity id from the server.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either new or original state
 */
export function updateEntityIdForRelations( state, action ) {
	const {
		modelName,
		oldEntityId,
		newEntityId,
		type,
	} = action;
	if ( type !== types.RECEIVE_UPDATED_ENTITY_ID_FOR_RELATIONS ) {
		return state;
	}
	const newState = { ...state };
	let stateUpdated = false;
	// handle top level model entities.
	const mainRecordToReplace = get(
		state,
		[ modelName, oldEntityId ],
		DEFAULT_EMPTY_OBJECT,
	);
	if ( mainRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		stateUpdated = true;
		delete newState[ modelName ][ oldEntityId ];
		set( newState, [ modelName, newEntityId ], mainRecordToReplace );
	}
	// cycle through all relations in child levels to see if the model and
	// old entity id exists.
	forEach( state, ( entityIds, mainModelName ) => {
		forEach( entityIds, ( modelRelations, entityId ) => {
			forEach( modelRelations, ( relationIds, relationName ) => {
				if (
					relationName === modelName &&
					relationIds.indexOf( oldEntityId ) > -1
				) {
					pull( relationIds, oldEntityId );
					relationIds.push( newEntityId );
					newState[ mainModelName ][ entityId ][ relationName ] =
						relationIds;
					stateUpdated = true;
				}
			} );
		} );
	} );
	return stateUpdated ? newState : state;
}

/**
 * Reducer for relation related state changes.
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Original state if no change, new state if change.
 */
export default function relations(
	state = DEFAULT_CORE_STATE.relations,
	action
) {
	switch ( action.type ) {
		case types.RECEIVE_RELATED_ENTITY_IDS:
		case types.REMOVE_RELATED_ENTITY_IDS:
			return receiveAndRemoveRelations( state, action );
		case types.RECEIVE_UPDATED_ENTITY_ID_FOR_RELATIONS:
			return updateEntityIdForRelations( state, action );
	}
	return state;
}
