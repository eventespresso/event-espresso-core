/**
 * External imports.
 */
import { DEFAULT_CORE_STATE, pluralModelName } from '@eventespresso/model';
import { get, union, isEmpty, difference, pullAll } from 'lodash';

/**
 * Internal Imports
 */
import { ACTION_TYPES } from '../actions/action-types';
const { types } = ACTION_TYPES.relations;
const DEFAULT_EMPTY_ARRAY = [];

/**
 * Reducer for the relations state in the store.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either a new state or the existing state.
 */
export default function relations( state = DEFAULT_CORE_STATE.relations, action ) {
	const {
		modelName,
		entityId,
		relationEntityIds,
		type,
	} = action;
	const relationName = pluralModelName( action.relationName );
	const existingIds = get(
		state,
		[ modelName, entityId, relationName ].join( '.' ),
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
