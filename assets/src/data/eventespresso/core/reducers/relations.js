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
const { relations: types } = ACTION_TYPES;

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
	};
	const {
		modelName,
		relationName,
		entityId,
		relatedEntityIds,
	} = action;
	// if modelName exists, then we just process as is.
	if ( state.hasIn( [ 'entityMap', modelName ] ) ) {
		return receiveAndRemoveRelations( state, action );
	}
	// if the singular form of the relation model name exists, then we need to
	// flip things so we're normalizing to always have an index from a single
	// modelName for this relation type.
	if ( state.hasIn(
		[ 'entityMap', singularModelName( relationName ) ]
	) ) {
		const newAction = {
			...action,
			modelName: singularModelName( relationName ),
			relationName: pluralModelName( modelName ),
			relatedEntityIds: [ entityId ],
		};
		// loop through each existing relation id and get the state for each
		while ( relatedEntityIds.length > 0 ) {
			newAction.entityId = relatedEntityIds.pop();
			state = receiveAndRemoveRelations( state, newAction );
		}
		return state;
	}
	// looks like things are already normalized correctly so just process as is.
	return receiveAndRemoveRelations( state, action );
};

/**
 * Used to set the relation index for the given data.
 *
 * @param {Immutable.Map} state
 * @param {Object} relationData
 * @param {boolean} removal  if true then removes the incoming relation ids from
 * the state, otherwise adds.
 * @return {Immutable.Map} Existing or changed state.
 */
const setRelationIndex = ( state, relationData, removal = false ) => {
	const {
		entityId,
		relatedEntityIds,
	} = relationData;
	const modelName = singularModelName( relationData.modelName );
	const relationName = pluralModelName( relationData.relationName );
	const relationIds = [ ...relatedEntityIds ];
	while ( relationIds.length > 0 ) {
		const path = [ 'index', relationName, relationIds.pop(), modelName ];
		let existingIds = state.getIn( path ) || Set();
		existingIds = removal ?
			existingIds.delete( entityId ) :
			existingIds.add( entityId );
		state = existingIds.isEmpty() ?
			removeEmptyFromState( state, path ) :
			state.setIn( path, existingIds );
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
	const path = [ 'entityMap', modelName, entityId, relationName ];

	const existingIds = state.getIn( path ) || Set();

	switch ( type ) {
		case types.RECEIVE_RELATED_ENTITY_IDS:
			state = state.setIn(
				path,
				existingIds.concat( relationEntityIds )
			);
			state = setRelationIndex( state, action );
			break;
		case types.REMOVE_RELATED_ENTITY_IDS:
			const idsAfterRemoval = existingIds.filter(
				( id ) => ! relationEntityIds.keyOf(
					normalizeEntityId( id )
				)
			);
			// Immutable.Set().filter() returns new instance, so let's compare
			// size.
			if ( idsAfterRemoval.count() === existingIds.count() ) {
				return state;
			}
			if ( ! idsAfterRemoval.isEmpty() ) {
				state = state.setIn( path, idsAfterRemoval );
			} else {
				state = removeEmptyFromState( state, path );
			}
			state = setRelationIndex( state, action, true );
			break;
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
	const modelAsRelationName = pluralModelName( modelName );
	const oldIndexPath = [ 'index', modelAsRelationName, oldEntityId ];
	const indexRecordToReplace = state.getIn( oldIndexPath ) || Map();
	if ( ! indexRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			'index',
			{
				modelName: modelAsRelationName,
				oldEntityId,
				newEntityId,
				mainRecordToReplace: indexRecordToReplace,
			}
		);
	}
	const oldEntityMapPath = [ 'entityMap', modelName, oldEntityId ];
	const mapEntityRecordToReplace = state.getIn( oldEntityMapPath ) || Map();

	if ( ! mapEntityRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			'entityMap',
			{
				modelName,
				oldEntityId,
				newEntityId,
				mainRecordToReplace: mapEntityRecordToReplace,
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
 * @param {string} statePropertyName (either `index` or `entityMap`)
 * @param {Object} modelData
 * @param {boolean} removeOnly If true, then the value for oldEntityId will be
 * removed from state and newEntity will not be added to state.
 * @return {Immutable.Map} Returns either new or existing state.
 */
const replaceRelationRecords = (
	state,
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
	const oldEntityPath = [ statePropertyName, modelName, oldEntityId ];
	state = state.withMutations( ( subState ) => {
		subState.deleteIn( oldEntityPath );
		oldEntityPath.pop();
		if ( removeOnly ) {
			if ( subState.getIn( oldEntityPath ).isEmpty() ) {
				subState.deleteIn( oldEntityPath );
			}
		} else {
			subState.setIn(
				[ ...oldEntityPath, newEntityId ],
				mainRecordToReplace
			);
		}
	} );

	//replace related entries
	mainRecordToReplace.forEach( ( relationIds, relationName ) => {
		relationIds = relationIds.toArray();
		state = state.withMutations( ( subState ) => {
			while ( relationIds.length > 0 ) {
				const relationPath = [
					loopProperty,
					relationName,
					relationIds.pop(),
					modelName,
				];
				let relationRecord = subState.getIn( relationPath ) || Set();
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
	const modelAsRelationName = pluralModelName( modelName );
	const indexRecordToReplace = state.getIn(
		[ 'index', modelAsRelationName, entityId ]
	) || Map();

	if ( ! indexRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			'index',
			{
				modelName: modelAsRelationName,
				oldEntityId: entityId,
				mainRecordToReplace: indexRecordToReplace,
			},
			true
		);
	}

	const entityMapRecordToReplace = state.getIn(
		[ 'entityMap', modelName, entityId ]
	) || Map();

	if ( ! entityMapRecordToReplace.isEmpty() ) {
		state = replaceRelationRecords(
			state,
			'entityMap',
			{
				modelName,
				oldEntityId: entityId,
				mainRecordToReplace: entityMapRecordToReplace,
			},
			true
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
	}
	return state;
}
