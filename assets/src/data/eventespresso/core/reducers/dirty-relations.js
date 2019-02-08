/**
 * External imports
 */
import {
	DEFAULT_CORE_STATE,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import { fromJS, Set, Map } from 'immutable';
import {
	removeEmptyFromState,
	normalizeEntityId,
} from '@eventespresso/helpers';
import cuid from 'cuid';

/**
 * Internal imports.
 */
import { ACTION_TYPES } from '../actions/action-types';
const { relations: types } = ACTION_TYPES;

/**
 * Used to determine whether the relation exists in the provided map.
 *
 * @param {Immutable.Map} relationMap
 * @param {string} queueType
 * @param {number} entityId
 * @return {boolean} True means the relation exists for the given entity Id
 * false means it does not exist.
 */
const relationExistsInMap = ( relationMap, queueType, entityId ) => {
	return relationMap.get( queueType, Set() ).includes( entityId );
};

/**
 * Used to indicate whether the relation exists already in the state for the
 * given data.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @param {Immutable.Map} relationMap
 * @return {boolean} True means the relation exists in the state.
 */
const hasRelation = ( state, action, relationMap ) => {
	const {
		relationEntityId,
		entityId,
		queueType,
	} = action;
	let { relationName, modelName } = action;
	if ( relationExistsInMap( relationMap, queueType, entityId ) ) {
		return true;
	}

	// still here? Okay, let's do a reverse lookup then, where the relation may
	// be stored with the relation as the originating entity.
	relationName = singularModelName( relationName );
	modelName = pluralModelName( modelName );
	const entityIds = state.getIn(
		[ queueType, relationName, relationEntityId, modelName ],
	);
	return entityIds ? entityIds.includes( entityId ) : false;
};

/**
 * Retrieve the relation map from the index for the given data.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} A new map is returned if there isn't an existing map present.
 */
const getRelationMap = ( state, action ) => {
	const { relationName, relationEntityId: relationId, modelName } = action;
	// get the map for the queueType
	return state.getIn(
		[ 'index', relationName, relationId, modelName ]
	) || Map();
};

/**
 * Given a set of ids, this returns whether the given id exists in it.
 *
 * @param {number} entityId
 * @param {Immutable.Set} idSet
 * @return {boolean} True means it exists in the array.
 */
const idExistsInSet = ( entityId, idSet ) => {
	return (
		idSet instanceof Set &&
		idSet.includes( entityId )
	);
};

/**
 * Reducer for adding to the relations index state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @param {Immutable.Map} relationMap
 * @return {Immutable.Map}  Either existing state if no change or new state if change.
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
	let entityIds = relationMap.get( queueType ) || Set();
	const path = [ relationName, relationEntityId, modelName, queueType ];
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.RECEIVE_DIRTY_RELATION_DELETION:
			if ( idExistsInSet( entityId, entityIds ) ) {
				return state;
			}
			state = state.setIn( path, entityIds.add( entityId ) );
			break;
		case types.REMOVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			if ( ! idExistsInSet( entityId, entityIds ) ) {
				return state;
			}
			entityIds = entityIds.delete( entityId );
			if ( entityIds.isEmpty() ) {
				state = removeEmptyFromState( state, path, 0 );
			} else {
				state = state.setIn( path, entityIds );
			}
			break;
	}
	return state;
}

/**
 * Retrieves relation ids from state for given data.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Set} A List of ids if present or empty List if not.
 */
function getRelationIdsFromState( state, action ) {
	const {
		relationName,
		modelName,
		entityId,
	} = action;
	const path = [ modelName, entityId, relationName ];
	return state.hasIn( path ) ? state.getIn( path ) : Set();
}

/**
 * Used to determine whether the state requires an update or not for the given
 * data.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @param {Immutable.Map} relationMap
 * @return {boolean} True indicates update is needed.
 */
function requiresUpdate( state, action, relationMap ) {
	switch ( action.type ) {
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.RECEIVE_DIRTY_RELATION_DELETION:
			return ! hasRelation( state, action, relationMap );
		case types.REMOVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			return hasRelation( state, action, relationMap );
	}
	return false;
}

/**
 * Reducer for updating dirty relation state for given data.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @param {Immutable.Map} relationMap
 * @return {Immutable.Map} If no change original state is returned otherwise new state.
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
	const ids = relationMap.get( queueType ) || Set();
	const path = [ modelName, entityId, relationName ];
	let relationIds;
	switch ( type ) {
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.RECEIVE_DIRTY_RELATION_DELETION:
			if ( idExistsInSet( entityId, ids ) ) {
				break;
			}
			relationIds = getRelationIdsFromState( state, action );
			if ( relationIds.includes( relationEntityId ) ) {
				break;
			}
			state = state.setIn( path, relationIds.add( relationEntityId ) );
			break;
		case types.REMOVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			if ( ! idExistsInSet( entityId, ids ) ) {
				break;
			}
			relationIds = getRelationIdsFromState( state, action );
			if ( ! relationIds.includes( relationEntityId ) ) {
				break;
			}
			relationIds = relationIds.delete( relationEntityId );
			if ( relationIds.isEmpty() ) {
				state = removeEmptyFromState( state, path, 0 );
			} else {
				state = state.setIn( path, relationIds );
			}
			break;
	}
	return state;
}

/**
 * Utility method assisting with replacing an old relation id for a new relation
 * id.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Either original or new state.
 */
function replaceOldRelationIdWithNewRelationId( state, action ) {
	let { oldEntityId, newEntityId } = action;
	const { modelName } = action;
	oldEntityId = normalizeEntityId( oldEntityId );
	newEntityId = normalizeEntityId( newEntityId );
	// replacements in index
	let newState = replaceIds(
		'index',
		state,
		modelName,
		oldEntityId,
		newEntityId
	);
	if ( newState === state ) {
		newState = replaceIds(
			'delete',
			newState,
			modelName,
			oldEntityId,
			newEntityId,
		);
	}
	if ( newState === state ) {
		newState = replaceIds(
			'add',
			newState,
			modelName,
			oldEntityId,
			newEntityId,
		);
	}
	return newState;
}

/**
 * Handles going through the provided state object and updating any occurrences
 * of the provided oldId for the provided model name with the new id.  This
 * mutates the incoming state so do not provide the original state from the
 * store.
 *
 * @param {string} stateProperty (what property for the state should be
 *   reviewed)
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {number} oldId
 * @param {number} newId
 * @return {Immutable.Map} Returns either new state or existing state.
 */
const replaceIds = ( stateProperty, state, modelName, oldId, newId ) => {
	const pluralName = pluralModelName( modelName );
	const singularName = singularModelName( modelName );
	const topLevelName = stateProperty === 'index' ? pluralName : singularName;
	const mainPath = [ stateProperty, topLevelName, oldId ];

	// first do top-level checks if it doesn't exist, bail.
	if ( ! state.hasIn( mainPath ) ) {
		return state;
	}

	const mainRecord = state.getIn( mainPath );

	state = state
		.deleteIn( mainPath )
		.setIn( [ stateProperty, topLevelName, newId ], mainRecord );

	// mainRecord provides the index to the other records needing updated.
	mainRecord.forEach( ( mapOrIds, relationModelName ) => {
		const updateIds = ( queueType, relationId ) => {
			const relationPath = [
				queueType,
				relationModelName,
				relationId,
				topLevelName,
			];
			let ids = state.getIn( relationPath ) || Set();
			ids = ids.delete( oldId ).add( newId );
			return state.setIn( relationPath, ids );
		};
		if ( mapOrIds instanceof Map ) {
			if ( mapOrIds.has( 'add' ) ) {
				mapOrIds.get( 'add' ).forEach( ( relationId ) => {
					state = updateIds( 'add', relationId );
				} );
			}
			if ( mapOrIds.has( 'delete' ) ) {
				mapOrIds.get( 'delete' ).forEach( ( relationId ) => {
					state = updateIds( 'delete', relationId );
				} );
			}
		} else if ( mapOrIds instanceof Set ) {
			const relationPath = [ 'index', relationModelName ];
			mapOrIds.forEach( ( relationId ) => {
				let indexRecord = state.getIn(
					[ ...relationPath, relationId, topLevelName ]
				);
				let ids = indexRecord.get( stateProperty ) || Set();
				ids = ids.delete( oldId ).add( newId );
				indexRecord = indexRecord.set( stateProperty, ids );
				state = state.setIn(
					[ ...relationPath, relationId, topLevelName ],
					indexRecord
				);
			} );
		}
	} );
	return state;
};

/**
 * This ensures that for incoming relation state, relations are recorded in one
 * direction.  For example adding a relation for `event` to `datetime` and then
 * sometime later `datetime` to `event` for the same entities should result in
 * just a single record, not two.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Object} The action object to work with after normalization.
 */
const normalizeActionForState = ( state, action ) => {
	// normalizeIds
	action.entityId = normalizeEntityId( action.entityId );
	action.relationEntityId = normalizeEntityId( action.relationEntityId );
	// we only use index to help with normalization
	const index = state.get( 'index' );
	const { modelName, relationName, relationEntityId, entityId } = action;
	if ( modelName &&
		relationName &&
		index.has( pluralModelName( modelName ) )
	) {
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
	// we can return as is but lets normalize the incoming names
	return {
		...action,
		modelName: modelName ? singularModelName( modelName ) : modelName,
		relationName: relationName ?
			pluralModelName( relationName ) :
			relationName,
	};
};

/**
 * Reducer for dirty relation state actions.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Returns original state if no changes, otherwise new state.
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
		case types.RECEIVE_DIRTY_RELATION_ADDITION:
		case types.REMOVE_DIRTY_RELATION_ADDITION:
			state = state.set(
				'index',
				indexRelations(
					Map( state.get( 'index' ) ),
					action,
					relationMap
				)
			);
			return state.set(
				'add',
				updateRelationState(
					Map( state.get( 'add' ) ),
					action,
					relationMap
				)
			);
		case types.RECEIVE_DIRTY_RELATION_DELETION:
		case types.REMOVE_DIRTY_RELATION_DELETION:
			// if the relation or entity id is a cuid, then we skip this because
			// the relation has never been persisted anyways.
			if (
				cuid.isCuid( action.relationEntityId ) ||
				cuid.isCuid( action.entityId )
			) {
				return state;
			}
			state = state.set(
				'index',
				indexRelations(
					Map( state.get( 'index' ) ),
					action,
					relationMap
				)
			);
			return state.set(
				'delete',
				updateRelationState(
					Map( state.get( 'delete' ) ),
					action,
					relationMap
				)
			);
	}
	return state;
}

/**
 * Utility function for removing entity id in the state for a given modelName
 * which may exist as a relation in the state.
 *
 * @param {Immutable.Map} state Immutable collection
 * @param {Object} modelData An object containing data for use in the function.
 * @return {Immutable.Map} Immutable collection  either the original state or a new state.
 */
const clearRelatedEntitiesForEntity = (
	state,
	modelData
) => {
	const {
		modelRemoved,
		entityIdRemoved,
		indexType,
		relationTypes,
	} = modelData;

	const recordPath = [
		indexType,
		modelRemoved,
		entityIdRemoved,
	];

	const clearEntityIdsInPath = ( subState, path ) => {
		if ( subState.hasIn( path ) ) {
			let entityIds = subState.getIn( path ) || Set();
			entityIds = entityIds.delete( entityIdRemoved );
			if ( ! entityIds.isEmpty() ) {
				subState.setIn( path, entityIds );
			} else {
				removeEmptyFromState(
					subState,
					path,
					1,
					false
				);
			}
		}
	};

	if ( state.hasIn( recordPath ) ) {
		state = state.withMutations( ( subState ) => {
			const mainRecord = subState.getIn( recordPath );
			removeEmptyFromState(
				subState,
				recordPath,
				1,
				false
			);
			mainRecord.forEach( ( relationRecord, relationModelName ) => {
				if ( relationRecord instanceof Set ) {
					relationRecord.forEach( ( relationId ) => {
						clearEntityIdsInPath(
							subState,
							[
								'index',
								relationModelName,
								relationId,
								modelRemoved,
								indexType,
							]
						);
					} );
				} else if (
					relationTypes !== null &&
					relationRecord instanceof Map
				) {
					relationTypes.forEach( ( relationType ) => {
						if ( relationRecord.has( relationType ) ) {
							const relationIds = relationRecord.get(
								relationType
							) || Set();
							relationIds.forEach( ( relationId ) => {
								clearEntityIdsInPath(
									subState,
									[
										relationType,
										relationModelName,
										relationId,
										modelRemoved,
									]
								);
							} );
						}
					} );
				}
			} );
		} );
	}
	return state;
};

/**
 * Handles removing all relationships in the dirty relations state for the given
 * action object (containing modelName and entityId)
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Either the original state or new state if it was updated.
 */
function removeRelatedEntitiesForEntity( state, action ) {
	const { modelName } = action;
	const pluralName = pluralModelName( modelName );
	const singleName = singularModelName( modelName );
	const entityId = normalizeEntityId( action.entityId );
	[
		[ pluralName, entityId, 'index', [ 'add', 'delete' ] ],
		[ singleName, entityId, 'add' ],
		[ singleName, entityId, 'delete' ],
	].forEach( ( [
		modelRemoved,
		entityIdRemoved,
		indexType,
		relationTypes = null,
	] ) => {
		state = clearRelatedEntitiesForEntity(
			state,
			{ modelRemoved, entityIdRemoved, indexType, relationTypes }
		);
	} );
	return state;
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
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Returns original state if no changes, otherwise new state.
 */
export default (
	state = fromJS( DEFAULT_CORE_STATE.dirty.relations ),
	action
) => {
	switch ( action.type ) {
		case types.RECEIVE_UPDATED_ENTITY_ID_FOR_RELATIONS:
			return replaceOldRelationIdWithNewRelationId( state, action );
		case types.REMOVE_RELATED_ENTITIES_FOR_ENTITY:
			return removeRelatedEntitiesForEntity( state, action );
		default:
			return dirtyRelations( state, action );
	}
};
