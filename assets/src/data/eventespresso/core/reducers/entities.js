/**
 * External imports
 */
import { convertToObjectFromMap } from '@eventespresso/helpers';
import { keys, isEmpty, difference, isMap, isUndefined } from 'lodash';
import {
	DEFAULT_CORE_STATE,
	getEntityPrimaryKeyValues,
} from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { keepExistingEntitiesInObject } from '../../base-entities';

/**
 * This replaces any entities in the incoming object with matching entities (by
 * id) in the state (if they exist).
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Map} entityRecords
 * @return {Object} New entityRecords object.
 */
const replaceExistingEntitiesFromState = ( state, modelName, entityRecords ) => {
	const existingEntities = state[ modelName ] ?
		state[ modelName ] :
		null;
	if ( existingEntities === null ) {
		return entityRecords;
	}
	return keepExistingEntitiesInObject( existingEntities, entityRecords );
};

export function receiveEntity( state, action ) {
	const { modelName, entity = null } = action;
	const entityId = getEntityPrimaryKeyValues( modelName, entity );

	if (
		! modelName ||
		! isModelEntityOfModel( entity, modelName ) ||
		( state[ modelName ] && state[ modelName ][ entityId ] )
	) {
		return state;
	}
	return {
		...state,
		[ modelName ]: {
			...state[ modelName ],
			[ entityId ]: entity,
		},
	};
}

/**
 * A reducer returning the new state for action.
 *
 * Handles receiving entity records from a rest response and converting them to
 * model entities using the provided factory.
 *
 * It is expected that the incoming entity records are indexed by the primary key
 * value for the entities.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {{entities: Map, entityIds: {}}} The new state (or the original if no
 * change detected or action isn't handled by this method)
 */
export function receiveEntityRecords( state, action ) {
	const { type, modelName, entities: incomingEntities = new Map() } = action;
	if (
		modelName &&
		state[ modelName ] &&
		isMap( incomingEntities ) &&
		! isEmpty( incomingEntities )
	) {
		let	updateState = false,
			entityRecords;
		switch ( type ) {
			case 'RECEIVE_ENTITY_RECORDS':
				// if all incoming keys exist in state already then we don't do
				// anything
				if ( isEmpty( difference(
					Array.from( incomingEntities.keys() ),
					keys( state[ modelName ] )
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
				entityRecords = convertToObjectFromMap( entityRecords );
				updateState = true;
				break;
			case 'RECEIVE_AND_REPLACE_ENTITY_RECORDS':
				updateState = true;
				entityRecords = convertToObjectFromMap( incomingEntities );
				break;
		}
		if ( updateState ) {
			return {
				...state,
				[ modelName ]: {
					...state[ modelName ],
					...entityRecords,
				},
			};
		}
	}
	return state;
}

export function removeEntityById( state, action ) {
	const { type, modelName, entityId = 0 } = action;
	if (
		type !== 'REMOVE_ENTITY_BY_ID' ||
		entityId === 0 ||
		isUndefined( state[ modelName ] ) ||
		isUndefined( state[ modelName ][ entityId ] )
	) {
		return state;
	}
	const newState = { ...state };
	delete newState[ modelName ][ entityId ];
	return newState;
}

export default function entities( state = DEFAULT_CORE_STATE.entities, action ) {
	if ( action.type ) {
		switch ( action.type ) {
			case 'RECEIVE_ENTITY_RECORDS':
			case 'RECEIVE_AND_REPLACE_ENTITY_RECORDS':
				return receiveEntityRecords( state, action );
			case 'RECEIVE_ENTITY':
				return receiveEntity( state, action );
			case 'REMOVE_ENTITY_BY_ID' :
				return removeEntityById( state, action );
			default:
				return state;
		}
	}
	return state;
}
