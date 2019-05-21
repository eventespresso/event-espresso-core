/**
 * External imports.
 */
import {
	DEFAULT_CORE_STATE,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import {
	removeEmptyFromState,
	normalizeEntityId,
} from '@eventespresso/helpers';
import { fromJS, Set, Map } from 'immutable';

/**
 * Internal Imports
 */
import { ACTION_TYPES } from '../actions/action-types';
const { relations: types, resets: resetTypes } = ACTION_TYPES;

/**
 * Handles normalizing the incoming action so that we're always only receiving
 * relation data in the state oriented from one direction.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Existing or new state.
 */
const normalizedReceiveAndRemoveRelations = ( state, action ) => {
	// first normalize the action
	action = {
		...action,
		modelName: singularModelName( action.modelName ),
		relationName: pluralModelName( action.relationName ),
		entityId: normalizeEntityId( action.entityId ),
	};
	const {
		modelName,
		relationName,
		relatedEntityIds,
		entityId,
	} = action;

	// add to state from the context of the model
	state = receiveAndRemoveRelations( state, action );

	// add to state from the context of the relation
	const newAction = {
		...action,
		modelName: singularModelName( relationName ),
		relationName: pluralModelName( modelName ),
		relatedEntityIds: [ entityId ],
	};

	while ( relatedEntityIds.length > 0 ) {
		newAction.entityId = normalizeEntityId( relatedEntityIds.pop() );
		state = receiveAndRemoveRelations( state, newAction );
	}

	return state;
};

/**
 * Reducer for the relations state in the store.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Either a new state or the existing state.
 */
function receiveAndRemoveRelations( state, action ) {
	const {
		modelName,
		relationName,
		entityId,
		type,
	} = action;
	const relationEntityIds = Set( action.relatedEntityIds );

	const path = [ modelName, entityId, relationName ];
	const existingIds = state.getIn( path, Set() );

	switch ( type ) {
		case types.RECEIVE_RELATED_ENTITY_IDS:
			return state.setIn(
				path,
				existingIds.concat( relationEntityIds )
			);
		case types.REMOVE_RELATED_ENTITY_IDS:
			const idsAfterRemoval = existingIds.filter(
				( id ) => ! relationEntityIds.keyOf( normalizeEntityId( id ) )
			);

			// Immutable.Set().filter() returns new instance, so let's compare
			// size
			if ( idsAfterRemoval.count() === existingIds.count() ) {
				return state;
			}
			return ! idsAfterRemoval.isEmpty() ?
				state.setIn( path, idsAfterRemoval ) :
				removeEmptyFromState( state, path );
	}

	return state;
}

/**
 * Reducer for handling entity ids in the relation that have a cuid that has
 * been updated with a new entity id from the server.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Either new or original state
 */
function updateEntityIdForRelations( state, action ) {
	let {
		oldEntityId,
		newEntityId,
		modelName,
	} = action;
	modelName = singularModelName( modelName );
	oldEntityId = normalizeEntityId( oldEntityId );
	newEntityId = normalizeEntityId( newEntityId );

	// from context of modelName
	const modelRecordToReplace = state.getIn(
		[ modelName, oldEntityId ],
		Map()
	);

	if ( ! modelRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			{
				modelName,
				oldEntityId,
				newEntityId,
				mainRecordToReplace: modelRecordToReplace,
			}
		);
	}
	return state;
}

/**
 * Utility method for handling replacing the old entity id from incoming model
 * with the provided new id data (or just removing it if removeOnly is true)
 * This handles both the index and entityMap objects in the relations state.
 *
 * @param {Immutable.Map} state
 * @param {Object} modelData
 * @param {boolean} removeOnly If true, then the value for oldEntityId will be
 * removed from state and newEntity will not be added to state.
 * @return {Immutable.Map} Returns either new or existing state.
 */
const replaceRelationRecords = (
	state,
	modelData,
	removeOnly = false,
) => {
	const {
		modelName,
		oldEntityId,
		newEntityId = 0,
		mainRecordToReplace,
	} = modelData;

	// first from context of model
	const mainPath = [ modelName, oldEntityId ];
	state = state.withMutations( ( subState ) => {
		subState.deleteIn( mainPath );
		mainPath.pop();
		if ( removeOnly ) {
			if ( subState.getIn( mainPath ).isEmpty() ) {
				subState.deleteIn( mainPath );
			}
		} else {
			subState.setIn(
				[ ...mainPath, newEntityId ],
				mainRecordToReplace
			);
		}
	} );

	// now we loop through the relations on the main record and use that to
	// change the values in the relation states.
	mainRecordToReplace.forEach( ( relationIds, relationName ) => {
		relationIds = relationIds.toArray();
		state = state.withMutations( ( subState ) => {
			while ( relationIds.length > 0 ) {
				const relationPath = [
					singularModelName( relationName ),
					relationIds.pop(),
					pluralModelName( modelName ),
				];
				let relationRecord = subState.getIn( relationPath, Set() );
				relationRecord = relationRecord.delete( oldEntityId );
				if ( removeOnly && relationRecord.isEmpty() ) {
					removeEmptyFromState(
						subState,
						relationPath,
						1,
						false
					);
				} else {
					relationRecord = removeOnly ?
						relationRecord :
						relationRecord.add( newEntityId );
					subState.setIn( relationPath, relationRecord );
				}
			}
		} );
	} );
	return state;
};

/**
 * Removes any relation requests for related entities in the state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} either existing (if no changes) or new state.
 */
const removeRelatedEntitiesForEntity = ( state, action ) => {
	let {
		modelName,
		entityId,
	} = action;
	modelName = singularModelName( modelName );
	entityId = normalizeEntityId( entityId );

	const modelRecordToReplace = state.getIn(
		[ modelName, entityId ],
		Map()
	);

	if ( ! modelRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			{
				modelName,
				oldEntityId: entityId,
				mainRecordToReplace: modelRecordToReplace,
			},
			true
		);
	}

	return state;
};

/**
 * Handles resetting the state for the given modelName in the action.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 *
 * @return {Immutable.Map} The new (or existing if no changes) state.
 */
const resetStateForModel = ( state, action ) => {
	const modelName = singularModelName( action.modelName );

	// get the relations for the model
	const modelRelations = state.get( modelName, Map() );

	if ( ! modelRelations.isEmpty() ) {
		// delete the modelName form the state
		state = state.delete( modelName );

		// loop through the relations and delete
		state = state.withMutations(
			( subState ) => {
				modelRelations.forEach( ( relationState ) => {
					relationState.forEach( ( relationIds, relationName ) => {
						relationIds = relationIds.toArray();
						while ( relationIds.length > 0 ) {
							const relationPath = [
								singularModelName( relationName ),
								relationIds.pop(),
							];
							let relationRecord = subState.getIn(
								relationPath,
								Map()
							);
							relationRecord = relationRecord.delete( pluralModelName( modelName ) );
							if ( relationRecord.isEmpty() ) {
								removeEmptyFromState(
									subState,
									relationPath,
									0,
									false
								);
							} else {
								subState.setIn( relationPath, relationRecord );
							}
						}
					} );
				} );
			}
		);
	}
	return state;
};

/**
 * export for tests
 */
export {
	normalizedReceiveAndRemoveRelations,
	updateEntityIdForRelations,
	removeRelatedEntitiesForEntity,
};

/**
 * Reducer for relation related state changes.
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} Original state if no change, new state if change.
 */
export default function relations(
	state = fromJS( DEFAULT_CORE_STATE.relations ),
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
		case resetTypes.RESET_ALL_STATE:
			return fromJS( DEFAULT_CORE_STATE.relations );
		case resetTypes.RESET_STATE_FOR_MODEL:
			return resetStateForModel( state, action );
	}
	return state;
}
