/**
 * External imports.
 */
import {
	DEFAULT_CORE_STATE,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
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
 * Handles normalizing the incoming action so that we're always only receiving
 * relation data in the state oriented from one direction.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Existing or new state.
 */
const normalizedReceiveAndRemoveRelations = ( state, action ) => {
	const {
		modelName,
		relationName,
		entityId,
		relationEntityIds,
	} = action;
	// if modelName exists, then we just process as is.
	if ( state.entityMap[ modelName ] ) {
		return receiveAndRemoveRelations( state, action );
	}
	// if the singular form of the relation model name exists, then we need to
	// flip things so we're normalizing to always have an index from a single
	// modelName for this relation type.
	if ( state.entityMap[ singularModelName( relationName ) ] ) {
		const newAction = {
			...action,
			modelName: singularModelName( relationName ),
			relationName: pluralModelName( modelName ),
			relationEntityIds: [ entityId ],
		};
		let newState = state;
		// loop through each existing relation id and get the state for each
		while ( relationEntityIds.length > 0 ) {
			newAction.entityId = relationEntityIds.shift();
			newState = receiveAndRemoveRelations( newState, newAction );
		}
		return newState;
	}
	// doesn't exist in state yet so process as normal
	return receiveAndRemoveRelations( state, action );
};

/**
 * Used to set the relation index for the given data.
 * Note: this mutates the incoming `newState` so don't send in the original
 * state!
 *
 * @param {Object} newState
 * @param {Object} relationData
 * @param {boolean} removal  if true then removes the incoming relation ids from
 * the state, otherwise adds.
 * @return {Object} A copy of the incoming state.
 */
const setRelationIndex = ( newState, relationData, removal = false ) => {
	const {
		modelName,
		entityId,
		relationEntityIds,
		relationName,
	} = relationData;
	while ( relationEntityIds.length > 0 ) {
		const relationId = relationEntityIds.shift();
		const existingIds = get(
			newState.index,
			[ relationName, relationId, modelName ],
			DEFAULT_EMPTY_ARRAY
		);
		if ( existingIds !== DEFAULT_EMPTY_ARRAY ) {
			if ( removal ) {
				pull( existingIds, entityId );
			} else {
				existingIds.push( entityId );
			}
			if ( existingIds.length > 0 ) {
				set(
					newState.index,
					[ relationName, relationId, modelName ],
					existingIds
				);
			} else {
				delete newState.index
					[ relationName ]
					[ relationId ]
					[ modelName ];
				if ( isEmpty( newState.index[ relationName ][ relationId ] ) ) {
					delete newState.index[ relationName ][ relationId ];
					if ( isEmpty( newState.index[ relationName ] ) ) {
						delete newState.index[ relationName ];
					}
				}
			}
		}
	}
	return newState;
};

/**
 * Reducer for the relations state in the store.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either a new state or the existing state.
 */
function receiveAndRemoveRelations( state, action ) {
	const {
		modelName,
		entityId,
		relationEntityIds,
		type,
	} = action;
	const relationName = pluralModelName( action.relationName );

	const existingIds = get(
		state.entityMap,
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
			set(
				newState.entityMap,
				[ modelName, entityId, relationName ],
				union( existingIds, relationEntityIds )
			);
			setRelationIndex( newState, action );
			return newState;
		case types.REMOVE_RELATED_ENTITY_IDS:
			const idsAfterRemoval = pullAll( relationEntityIds, existingIds );
			if ( idsAfterRemoval.length === existingIds.length ) {
				return state;
			}
			setRelationIndex( newState, action, true );
			if ( idsAfterRemoval.length > 0 ) {
				set(
					newState.entityMap,
					[ modelName, entityId, relationName ],
					idsAfterRemoval
				);
			} else {
				delete newState.entityMap
					[ modelName ]
					[ entityId ]
					[ relationName ];
				if ( isEmpty(
					newState.entityMap[ modelName ][ entityId ]
				) ) {
					delete newState.entityMap[ modelName ][ entityId ];
					if ( isEmpty( newState.entityMap[ modelName ] ) ) {
						delete newState.entityMap[ modelName ];
					}
				}
			}
			return newState;
	}
	return state;
}

/**
 * Reducer for handling entity ids in the relation that have a cuid that has
 * been updated with a new entity id from the server.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} Either new or original state
 */
function updateEntityIdForRelations( state, action ) {
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
	const modelAsRelationName = pluralModelName( modelName );
	let stateUpdated = false;

	const indexRecordToReplace = get(
		newState.index,
		[ modelAsRelationName, oldEntityId ],
		DEFAULT_EMPTY_OBJECT
	);

	if ( indexRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		stateUpdated = true;
		replaceRelationRecords(
			newState,
			'index',
			{
				modelName: modelAsRelationName,
				oldEntityId,
				newEntityId,
				mainRecordToReplace: indexRecordToReplace,
			}
		);
	}

	const mapEntityRecordToReplace = get(
		newState.entityMap,
		[ modelName, oldEntityId ],
		DEFAULT_EMPTY_OBJECT
	);

	if ( mapEntityRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		stateUpdated = true;
		replaceRelationRecords(
			newState,
			'entityMap',
			{
				modelName,
				oldEntityId,
				newEntityId,
				mainRecordToReplace: mapEntityRecordToReplace,
			}
		);
	}
	return stateUpdated ? newState : state;
}

/**
 * Utility method for handling replacing the old entity id from incoming model
 * with the provided new id data (or just removing it if removeOnly is true)
 * This handles both the index and entityMap objects in the relations state.
 *
 * Note: this mutates the incoming `newState` object.
 *
 * @param {Object} newState
 * @param {string} statePropertyName (either `index` or `entityMap`)
 * @param {Object} modelData
 * @param {boolean} removeOnly If true, then the value for oldEntityId will be
 * removed from state and newEntity will not be added to state.
 */
const replaceRelationRecords = (
	newState,
	statePropertyName,
	modelData,
	removeOnly = false,
) => {
	const {
		modelName,
		oldEntityId,
		newEntityId = 0,
		mainRecordToReplace,
	} = modelData;
	const loopProperty = statePropertyName === 'index' ? 'entityMap' : 'index';
	delete newState[ statePropertyName ][ modelName ][ oldEntityId ];
	if ( removeOnly ) {
		if ( isEmpty( newState[ statePropertyName ][ modelName ] ) ) {
			delete newState[ statePropertyName ][ modelName ];
		}
	} else {
		set(
			newState,
			[ statePropertyName, modelName, newEntityId ],
			mainRecordToReplace,
		);
	}
	// replace related entries
	forEach( mainRecordToReplace, ( relationIds, relationName ) => {
		while ( relationIds.length > 0 ) {
			const relationId = relationIds.shift();
			const relationRecord = get(
				newState,
				[ loopProperty, relationName, relationId, modelName ],
				DEFAULT_EMPTY_ARRAY
			);
			if ( relationRecord !== DEFAULT_EMPTY_ARRAY ) {
				pull( relationRecord, oldEntityId );
			} else {
				relationRecord.push( newEntityId );
			}
			if ( relationRecord.length > 0 ) {
				set(
					newState,
					[ loopProperty, relationName, relationId, modelName ],
					relationRecord
				);
			} else {
				delete newState
					[ loopProperty ]
					[ relationName ]
					[ relationId ]
					[ modelName ];
				if ( isEmpty(
					newState
						[ loopProperty ]
						[ relationName ]
						[ relationId ]
				) ) {
					delete newState
						[ loopProperty ]
						[ relationName ]
						[ relationId ];
					if ( isEmpty(
						newState[ loopProperty ][ relationName ]
					) ) {
						delete newState[ loopProperty ][ relationName ];
					}
				}
			}
		}
	} );
};

/**
 * Removes any relation requests for related entities in the state.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object} either existing (if no changes) or new state.
 */
const removeRelatedEntitiesForEntity = ( state, action ) => {
	const {
		modelName,
		entityId,
		type,
	} = action;
	if ( type !== types.REMOVE_RELATED_ENTITIES_FOR_ENTITY ) {
		return state;
	}
	const newState = { ...state };
	const modelAsRelationName = pluralModelName( modelName );
	let stateUpdated = false;

	const indexRecordToReplace = get(
		newState.index,
		[ modelAsRelationName, entityId ],
		DEFAULT_EMPTY_OBJECT,
	);

	if ( indexRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		stateUpdated = true;
		replaceRelationRecords(
			newState,
			'index',
			{
				modelName: modelAsRelationName,
				oldEntityId: entityId,
				mainRecordToReplace: indexRecordToReplace,
			},
			true
		);
	}

	const entityMapRecordToReplace = get(
		newState.entityMap,
		[ modelName, entityId ],
		DEFAULT_EMPTY_OBJECT
	);

	if ( entityMapRecordToReplace !== DEFAULT_EMPTY_OBJECT ) {
		stateUpdated = true;
		replaceRelationRecords(
			newState,
			'entityMap',
			{
				modelName,
				oldEntityId: entityId,
				mainRecordToReplace: entityMapRecordToReplace,
			},
			true
		);
	}
	return stateUpdated ? newState : state;
};

export {
	normalizedReceiveAndRemoveRelations,
	updateEntityIdForRelations,
	removeRelatedEntitiesForEntity,
};

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
			return normalizedReceiveAndRemoveRelations( state, action );
		case types.RECEIVE_UPDATED_ENTITY_ID_FOR_RELATIONS:
			return updateEntityIdForRelations( state, action );
		case types.REMOVE_RELATED_ENTITIES_FOR_ENTITY:
			return removeRelatedEntitiesForEntity( state, action );
	}
	return state;
}
