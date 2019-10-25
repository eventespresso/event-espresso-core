/**
 * External imports
 */
import { fromJS, Map } from 'immutable';
import { isEmpty, difference } from 'lodash';
import { DEFAULT_CORE_STATE, singularModelName } from '@eventespresso/model';
import { isModelEntity, isModelEntityOfModel } from '@eventespresso/validators';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Internal imports
 */
import { ACTION_TYPES } from '../actions/action-types';
const { entities: types, resets: resetTypes } = ACTION_TYPES;
const DEFAULT_STATE = fromJS( DEFAULT_CORE_STATE.entities );

/**
 * This replaces any entities in the incoming object with matching entities (by
 * id) in the state (if they exist).
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {Immutable.Map} entityRecords
 * @return {Immutable.Map} New entityRecords object.
 */
const replaceExistingEntitiesFromState = ( state, modelName, entityRecords ) => {
	const existingEntities = state.get( modelName, null );
	if ( existingEntities === null ) {
		return entityRecords;
	}
	return entityRecords.merge( existingEntities );
};

/**
 * Reducer for receiving an entity into the state.
 *
 * This does not replace any entity that already exists in the state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} New state if there is a change otherwise existing state.
 */
function receiveEntity( state, action ) {
	/**
	 * @type {string} modelName
	 * @type {BaseEntity|null} entity
	 */
	const { entity } = action;

	if (
		! isModelEntity( entity ) ||
		state.hasIn( [ entity.modelName, entity.id ] )
	) {
		return state;
	}
	return state.setIn( [ entity.modelName, entity.id ], entity );
}

/**
 * A reducer returning the new state for action.
 *
 * Handles receiving entity records from a rest response and converting them to
 * model entities using the provided factory.
 *
 * It is expected that the incoming entity records are an array of BaseEntity
 * children instances.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} The new state (or the original if no
 * change detected or action isn't handled by this method)
 */
function receiveEntityRecords( state, action ) {
	const { type, modelName } = action;
	// convert from array of entities to a Map indexed by entity id.
	const incomingEntities = Map().withMutations( ( subState ) => {
		action.entities.forEach(
			( entity ) => {
				if ( isModelEntityOfModel( entity, modelName ) ) {
					subState.set( entity.id, entity );
				}
			}
		);
	} );
	if ( ! state.has( modelName ) || incomingEntities.isEmpty() ) {
		return state;
	}
	let	updateState = false,
		entityRecords;
	switch ( type ) {
		case types.RECEIVE_ENTITY_RECORDS:
			// if all incoming keys exist in state already then we don't do
			// anything
			if ( isEmpty( difference(
				Array.from( incomingEntities.keys() ),
				Array.from( state.get( modelName, Map() ).keys() )
			) ) ) {
				break;
			}
			// replace any incoming entityRecords with existing entityRecords already
			// in the store so this registry acts as the "authority"
			// for entityRecords.
			entityRecords = replaceExistingEntitiesFromState(
				state,
				modelName,
				incomingEntities
			);
			updateState = true;
			break;
		case types.RECEIVE_AND_REPLACE_ENTITY_RECORDS:
			updateState = true;
			entityRecords = state.get( modelName, Map() ).merge( incomingEntities );
			break;
	}
	if ( updateState ) {
		return state.set( modelName, entityRecords );
	}
	return state;
}

/**
 * A reducer handling the removal of an entity from state matching the given
 * id.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} New or existing state.
 */
function removeEntityById( state, action ) {
	const { modelName, entityId = 0 } = action;
	const id = normalizeEntityId( entityId );
	return state.deleteIn( [ modelName, id ] );
}

/**
 * Exports useful for tests.
 */
export {
	receiveEntity,
	receiveEntityRecords,
	removeEntityById,
};

/**
 * Default reducer for handling entities in state.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map} New or existing state
 */
export default function entities( state = DEFAULT_STATE, action ) {
	if ( action.type ) {
		switch ( action.type ) {
			case types.RECEIVE_ENTITY_RECORDS:
			case types.RECEIVE_AND_REPLACE_ENTITY_RECORDS:
				return receiveEntityRecords( state, action );
			case types.RECEIVE_ENTITY:
				return receiveEntity( state, action );
			case types.REMOVE_ENTITY_BY_ID :
				return removeEntityById( state, action );
			case resetTypes.RESET_ALL_STATE :
				return DEFAULT_STATE;
			case resetTypes.RESET_STATE_FOR_MODEL :
				return state.has( singularModelName( action.modelName ) ) ?
					state.set( singularModelName( action.modelName ), Map() ) :
					state;
		}
	}
	return state;
}
