/**
 * External imports
 */
import {
	DEFAULT_CORE_STATE,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import { isArray, pull, isEmpty, get, set, forEach } from 'lodash';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { types } = ACTION_TYPES.relations;

const DEFAULT_EMPTY_ARRAY = [];
const DEFAULT_EMPTY_OBJECT = {};

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
	const entityIds = [
		...get(
			state,
			[ queueType, relationName, relationEntityId, modelName ],
			DEFAULT_EMPTY_ARRAY
		),
	];
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
	// get the map from the index
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
	const entityIds = relationMap.get( queueType ) || DEFAULT_EMPTY_ARRAY;
	const newState = { ...state };
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_INDEX:
			if ( idExistsInArray( entityId, entityIds ) ) {
				return state;
			}
			entityIds.push( entityId );
			set(
				newState,
				[ relationName, relationEntityId, modelName ],
				relationMap.set( queueType, entityIds )
			);
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
				set(
					newState,
					[ relationName, relationEntityId, modelName ],
					relationMap.set( queueType, entityIds )
				);
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
		[ modelName, entityId, relationName ],
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
	const ids = relationMap.get( queueType ) || DEFAULT_EMPTY_ARRAY;
	const newState = { ...state };
	let relationIds = DEFAULT_EMPTY_ARRAY;
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
			set(
				newState,
				[ modelName, entityId, relationName ],
				relationIds
			);
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
			pull( relationIds, relationEntityId );
			if ( relationIds.length < 1 ) {
				delete newState[ modelName ][ entityId ][ relationName ];
				if ( isEmpty( newState[ modelName ][ entityId ] ) ) {
					delete newState[ modelName ][ entityId ];
					if ( isEmpty( newState[ modelName ] ) ) {
						delete newState[ modelName ];
					}
				}
			} else {
				set(
					newState,
					[ modelName, entityId, relationName ],
					relationIds,
				);
				newState[ modelName ][ entityId ][ relationName ] = relationIds;
			}
			return newState;
	}
	return state;
}

/**
 * Utility method assisting with replacing an old relation id for a new relation
 * id.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either original or new state.
 */
function replaceOldRelationIdWithNewRelationId( state, action ) {
	const {
		modelName,
		oldEntityId,
		newEntityId,
	} = action;
	const newState = { ...state };
	// replacements in index
	let stateUpdated = replaceIds(
		'index',
		newState,
		modelName,
		oldEntityId,
		newEntityId
	);
	let wasUpdated = replaceIds(
		'delete',
		newState,
		modelName,
		oldEntityId,
		newEntityId,
	);
	stateUpdated = stateUpdated || wasUpdated;
	wasUpdated = replaceIds(
		'add',
		newState,
		modelName,
		oldEntityId,
		newEntityId,
	);
	stateUpdated = stateUpdated || wasUpdated;
	if ( stateUpdated ) {
		return newState;
	}
	return state;
}

/**
 * Handles going through the provided state object and updating any occurrences
 * of the provided oldId for the provided model name with the new id.  This
 * mutates the incoming state so do not provide the original state from the
 * store.
 *
 * @param {string} stateProperty (what property for the state should be reviewed)
 * @param {Object} newState
 * @param {string} modelName
 * @param {number} oldId
 * @param {number} newId
 * @return {boolean} Returns whether the provided state was updated or not.
 */
const replaceIds = ( stateProperty, newState, modelName, oldId, newId ) => {
	let updated = false;
	const pluralName = pluralModelName( modelName );
	const singularName = singularModelName( modelName );
	const topLevelName = stateProperty === 'index' ? pluralName : singularName;
	// first do top-level checks
	const mainRecordToReplace = get(
		newState,
		[ stateProperty, topLevelName, oldId ],
		DEFAULT_EMPTY_OBJECT
	);
	if ( mainRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		updated = true;
		delete newState[ stateProperty ][ modelName ][ oldId ];
		set( newState, [ stateProperty, modelName, newId ], mainRecordToReplace );
	}

	// now we have to loop through all records to see if there's anything
	// matching the old id in nested records.
	forEach( newState[ stateProperty ], ( entityIds, mainModelName ) => {
		forEach( entityIds, ( modelRelations, entityId ) => {
			forEach( modelRelations, ( relationIds, relationName ) => {
				let updatedIds = false;
				if ( relationName === singularName ) {
					// index property handling
					if ( relationIds instanceof Map ) {
						const deleteIds = relationIds.get( 'delete' ) ||
							DEFAULT_EMPTY_ARRAY;
						const addIds = relationIds.get( 'add' ) ||
							DEFAULT_EMPTY_ARRAY;
						if ( deleteIds.indexOf( oldId ) > -1 ) {
							pull( deleteIds, oldId );
							deleteIds.push( newId );
							relationIds.set( 'delete', deleteIds );
							updatedIds = true;
						}
						if ( addIds.indexOf( oldId ) > -1 ) {
							pull( addIds, oldId );
							addIds.push( newId );
							relationIds.set( 'add', addIds );
							updatedIds = true;
						}
					// delete and add property handling
					} else if ( relationIds.indexOf( oldId ) > -1 ) {
						pull( relationIds, oldId );
						relationIds.push( newId );
						updatedIds = true;
					}
					if ( updatedIds ) {
						set(
							newState,
							[
								stateProperty,
								mainModelName,
								entityId,
								relationName,
							],
							relationIds
						);
						updated = true;
					}
				}
			} );
		} );
	} );
	return updated;
};

/**
 * This ensures that for incoming relation state, relations are recorded in one
 * direction.  For example adding a relation for `event` to `datetime` and then
 * sometime later `datetime` to `event` for the same entities should result in
 * just a single record, not two.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} The action object to work with after normalization.
 */
const normalizeActionForState = ( state, action ) => {
	// we only use index to help with normalization
	const index = state.index;
	const {
		modelName,
		relationName,
		entityId,
		relationEntityId,
	} = action;
	if ( index[ pluralModelName( modelName ) ] ) {
		// okay this model has already been used as a relation on another model
		// so let's normalize and make it the relation instead.
		return {
			...action,
			modelName: singularModelName( relationName ),
			entityId: relationEntityId,
			relationName: pluralModelName( modelName ),
			relationEntityId: entityId,
		};
	}
	// we can return as is
	return action;
};

/**
 * Reducer for dirty relation state actions.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Returns original state if no changes, otherwise new state.
 */
function dirtyRelations( state, action ) {
	action = normalizeActionForState( state, action );
	const { type } = action;
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
}

/**
 * Utility function for removing entity id in the state for a given modelName
 * which may exist as a relation in the state.
 *
 * The incoming state is mutated so do not pass in original state from the
 * store.
 *
 * @param {Object} state  specific state object
 * @param {Object} modelData An object containing data for use in the function.
 */
const clearRelatedEntitiesForEntity = (
	state,
	modelData
) => {
	const {
		relationIds,
		relationName,
		modelRemoved,
		entityIdRemoved,
		queueType = null,
	} = modelData;
	while ( relationIds.length > 0 ) {
		const relationId = relationIds.shift();
		const relationRecordIds = get(
			state,
			[ relationName, relationId, modelRemoved ],
			DEFAULT_EMPTY_ARRAY
		);
		let ids = DEFAULT_EMPTY_ARRAY;
		if ( queueType && ( relationRecordIds instanceof Map ) ) {
			ids = relationRecordIds.get( queueType ) || ids;
		} else {
			ids = relationRecordIds;
		}
		pull( ids, entityIdRemoved );
		if ( ids.length > 0 ) {
			set(
				state,
				[ relationName, relationId, modelRemoved ],
				relationRecordIds instanceof Map ?
					relationRecordIds.set( queueType, ids ) :
					ids
			);
		} else {
			if (
				queueType &&
				relationRecordIds instanceof Map &&
				! isEmpty( relationRecordIds )
			) {
				return;
			}
			delete state
				[ relationName ]
				[ relationId ]
				[ modelRemoved ];
			if ( isEmpty(
				state[ relationName ][ relationId ]
			) ) {
				delete state[ relationName ][ relationId ];
				if ( isEmpty( state[ relationName ] ) ) {
					delete state[ relationName ];
				}
			}
		}
	}
};

/**
 * Handles removing all relationships in the dirty relations state for the given
 * action object (containing modelName and entityId)
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either the original state or new state if it was updated.
 */
function removeRelatedEntitiesForEntity( state, action ) {
	const { modelName, entityId } = action;
	// first check index
	const indexRecord = get(
		state.index,
		[ pluralModelName( modelName ), entityId ],
		DEFAULT_EMPTY_OBJECT
	);
	const addRecord = get(
		state.add,
		[ modelName, entityId ],
		DEFAULT_EMPTY_OBJECT
	);
	const deleteRecord = get(
		state.delete,
		[ modelName, entityId ],
		DEFAULT_EMPTY_OBJECT
	);
	const newState = { ...state };
	let hasUpdated = false;
	if ( indexRecord !== DEFAULT_EMPTY_OBJECT ) {
		forEach( indexRecord, ( relationMap, relationName ) => {
			const relationAddIds = relationMap.get( 'add' ) ||
				DEFAULT_EMPTY_ARRAY;
			clearRelatedEntitiesForEntity(
				newState.add,
				{
					relationIds: relationAddIds,
					relationName,
					modelRemoved: modelName,
					entityIdRemoved: entityId,
				}
			);
			const deleteIds = relationMap.get( 'delete' );
			clearRelatedEntitiesForEntity(
				newState.delete,
				{
					relationIds: deleteIds,
					relationName,
					modelRemoved: modelName,
					entityIdRemoved: entityId,
				}
			);
		} );
		delete newState.index[ pluralModelName( modelName ) ][ entityId ];
		hasUpdated = true;
	}

	if ( addRecord !== DEFAULT_EMPTY_OBJECT ) {
		forEach( addRecord, ( relationIds, relationName ) => {
			clearRelatedEntitiesForEntity(
				newState.index,
				{
					relationIds,
					relationName,
					modelRemoved: modelName,
					entityIdRemoved: entityId,
					queueType: 'add',
				}
			);
		} );
		delete newState.add[ modelName ][ entityId ];
		hasUpdated = true;
	}

	if ( deleteRecord !== DEFAULT_EMPTY_OBJECT ) {
		forEach( deleteRecord, ( relationIds, relationName ) => {
			clearRelatedEntitiesForEntity(
				newState.index,
				{
					relationIds,
					relationName,
					modelRemoved: modelName,
					entityIdRemoved: entityId,
					queueType: 'delete',
				}
			);
		} );
		delete newState.delete[ modelName ][ entityId ];
		hasUpdated = true;
	}
	return hasUpdated ? newState : state;
}

/**
 * exports useful for testing.
 */
export {
	replaceOldRelationIdWithNewRelationId,
	removeRelatedEntitiesForEntity,
	dirtyRelations,
};

/**
 * Default reducer for handling dirty relation state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Returns original state if no changes, otherwise new state.
 */
export default ( state = DEFAULT_CORE_STATE.dirty.relations, action ) => {
	switch ( action.type ) {
		case types.RECEIVE_UPDATED_ENTITY_ID_FOR_RELATIONS:
			return replaceOldRelationIdWithNewRelationId( state, action );
		case types.REMOVE_RELATED_ENTITIES_FOR_ENTITY:
			return removeRelatedEntitiesForEntity( state, action );
		default:
			return dirtyRelations( state, action );
	}
};
