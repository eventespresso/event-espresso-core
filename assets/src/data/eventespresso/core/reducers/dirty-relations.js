/**
 * External imports
 */
import {
	DEFAULT_CORE_STATE,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import { isArray, pull, isEmpty, get } from 'lodash';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { types } = ACTION_TYPES.relations;

const DEFAULT_EMPTY_ARRAY = [];

/**
 * Used to determine whether the relation exists in the provided map.
 *
 * @param {Map} relationMap
 * @param {string} queueType
 * @param {number} entityId
 * @return {boolean} True means the relation exists for the given entity Id
 * false means it does not exist.
 */
const relationExistsInMap = ( relationMap, queueType, entityId ) => {
	const entityIds = relationMap.get( queueType );
	return idExistsInArray( entityId, queueType, entityIds );
};

/**
 * Used to indicate whether the relation exists already in the state for the
 * given data.
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Map} relationMap
 * @return {boolean} True means the relation exists in the state.
 */
const relationExistsAlready = ( state, action, relationMap ) => {
	const {
		relationEntityId,
		entityId,
		queueType,
	} = action;
	let relationName = action.relationName;
	let modelName = action.modelName;

	if ( relationExistsInMap( relationMap, queueType, entityId ) ) {
		return true;
	}

	// still here? Okay, let's do a reverse lookup then, where the relation may
	// be stored with the relation as the originating entity.
	relationName = singularModelName( relationName );
	modelName = pluralModelName( modelName );
	const entityIds = get(
		state,
		[ queueType, relationName, relationEntityId, modelName ].join( '.' ),
		DEFAULT_EMPTY_ARRAY
	);
	return entityIds.indexOf( entityId ) > -1;
};

/**
 * Retrieve the relation map from the index for the given data.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Map} A new map is returned if there isn't an existing map present.
 */
const getRelationMap = ( state, action ) => {
	const { relationName, relationEntityId: relationId, modelName } = action;
	// we check the index because that's the "authority".
	const relationMap = get(
		state,
		[ 'index', relationName, relationId, modelName ].join( '.' )
	);
	return relationMap instanceof Map ?
		relationMap :
		new Map();
};

/**
 * Given an array of ids, this returns whether the given id exists in it.
 *
 * @param {number} entityId
 * @param {Array} idArray
 * @return {boolean} True means it exists in the array.
 */
const idExistsInArray = ( entityId, idArray ) => {
	return (
		isArray( idArray ) &&
		idArray.indexOf( entityId ) > -1
	);
};

/**
 * Reducer for adding to the relations index state.
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Map} relationMap
 * @return {Object}  Either existing state if no change or new state if change.
 */
function indexRelations( state, action, relationMap ) {
	const {
		type,
		relationName,
		relationEntityId,
		modelName,
		entityId,
		queueType,
	} = action;
	const entityIds = relationMap.get( queueType );
	const newState = { ...state };
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_INDEX:
			if ( idExistsInArray( entityId, entityIds ) ) {
				return state;
			}
			entityIds.push( entityId );
			newState[ relationName ][ relationEntityId ][ modelName ] =
				relationMap.set( queueType, entityIds );
			return newState;
		case types.REMOVE_DIRTY_RELATION_INDEX:
			if ( ! idExistsInArray( entityId, entityIds ) ) {
				return state;
			}
			pull( entityIds, entityId );
			if ( entityIds.length < 1 ) {
				delete newState[ relationName ][ relationEntityId ][ modelName ];
				if ( isEmpty( newState[ relationName ][ relationEntityId ] ) ) {
					delete newState[ relationName ][ relationEntityId ];
				}
			} else {
				newState[ relationName ][ relationEntityId ][ modelName ] =
					relationMap.set( queueType, entityIds );
			}
			return newState;
	}
	return state;
}

/**
 * Retrieves relation ids from state for given data.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Array} An array of ids if present or empty array if not.
 */
function getRelationIdsFromState( state, action ) {
	const {
		relationName,
		modelName,
		entityId,
	} = action;
	return get(
		state,
		[ modelName, entityId, relationName ].join( '.' ),
		DEFAULT_EMPTY_ARRAY
	);
}

/**
 * Used to determine whether the state requires an update or not for the given
 * data.
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Map} relationMap
 * @return {boolean} True indicates update is needed.
 */
function requiresUpdate( state, action, relationMap ) {
	switch ( action.type ) {
		case types.RECEIVE_DIRTY_RELATION_INDEX:
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.RECEIVE_DIRTY_RELATION_DELETION:
			return relationExistsAlready( state, action, relationMap );
		case types.REMOVE_DIRTY_RELATION_INDEX:
		case types.REMOVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			return ! relationExistsAlready( state, action, relationMap );
	}
	return false;
}

/**
 * Reducer for updating dirty relation state for given data.
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Map} relationMap
 * @return {Object} If no change original state is returned otherwise new state.
 */
function updateRelationState( state, action, relationMap ) {
	const {
		type,
		relationName,
		relationEntityId,
		modelName,
		entityId,
		queueType,
	} = action;
	const ids = relationMap.get( queueType );
	const newState = { ...state };
	let relationIds = [];
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.RECEIVE_DIRTY_RELATION_DELETION:
			if ( idExistsInArray( entityId, ids ) ) {
				return state;
			}
			relationIds = getRelationIdsFromState( state, action );
			if ( relationIds.indexOf( relationEntityId ) === -1 ) {
				relationIds.push( relationEntityId );
			}
			newState[ modelName ][ entityId ][ relationName ] = relationIds;
			return newState;
		case types.REMOVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			if ( ! idExistsInArray( entityId, ids ) ) {
				return state;
			}
			relationIds = getRelationIdsFromState( state, action );
			if ( relationIds.indexOf( relationEntityId ) === -1 ) {
				return state;
			}
			relationIds.pull( relationEntityId );
			if ( relationIds.length < 1 ) {
				delete newState[ modelName ][ entityId ][ relationName ];
				if ( isEmpty( newState[ modelName ][ entityId ] ) ) {
					delete newState[ modelName ][ entityId ];
				}
			} else {
				newState[ modelName ][ entityId ][ relationName ] = relationIds;
			}
			return newState;
	}
	return state;
}

/**
 * Default reducer for handling dirty relation state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Returns original state if no changes, otherwise new state.
 */
export default ( state = DEFAULT_CORE_STATE.dirty.relations, action ) => {
	const { type } = action;
	action.relationName = pluralModelName( action.relationName );
	const relationMap = getRelationMap( state, action );
	// does this even need an update?
	if ( ! requiresUpdate( state, action, relationMap ) ) {
		return state;
	}
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_INDEX:
		case types.REMOVE_DIRTY_RELATION_INDEX:
			return {
				...state,
				index: indexRelations(
					state.index,
					action,
					relationMap
				),
			};
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_ADDITION:
			return {
				...state,
				add: updateRelationState(
					state.add,
					action,
					relationMap
				),
			};
		case types.RECEIVE_DIRTY_RELATION_DELETION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			return {
				...state,
				delete: updateRelationState(
					state.delete,
					action,
					relationMap
				),
			};
	}
	return state;
};
