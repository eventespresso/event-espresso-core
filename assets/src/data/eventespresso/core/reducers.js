/**
 * External imports
 */
import {
	mergeAndDeDuplicateArrays,
	convertToObjectFromMap,
} from '@eventespresso/helpers';
import { keys, isEmpty, difference, isMap } from 'lodash';

/**
 * Internal imports
 */
import { DEFAULT_CORE_STATE } from '../../model';
import {
	keepExistingEntitiesInObject,
} from '../base-entities';

/**
 * This replaces any entities in the incoming object with matching entities (by
 * id) in the state (if they exist).
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Map} entities
 * @return {Object} New entities object.
 */
const replaceExistingEntitiesFromState = ( state, modelName, entities ) => {
	const existingEntities = state.entities[ modelName ] ?
		state.entities[ modelName ] :
		null;
	if ( existingEntities === null ) {
		return entities;
	}
	return keepExistingEntitiesInObject( existingEntities, entities );
};

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
export default function receiveEntityRecords( state = DEFAULT_CORE_STATE, action ) {
	const { type, modelName, entities: incomingEntities = new Map() } = action;
	if (
		modelName &&
		state.entities[ modelName ] &&
		isMap( incomingEntities ) &&
		! isEmpty( incomingEntities )
	) {
		let	updateState = false,
			entities;
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
				// replace any incoming entities with existing entities already
				// in the store so this registry acts as the "authority"
				// for entities.
				entities = replaceExistingEntitiesFromState(
					state,
					modelName,
					incomingEntities
				);
				entities = convertToObjectFromMap( entities );
				updateState = true;
				break;
			case 'RECEIVE_AND_REPLACE_ENTITY_RECORDS':
				updateState = true;
				entities = convertToObjectFromMap( incomingEntities );
				break;
		}
		if ( updateState ) {
			return {
				...state,
				entities: {
					...state.entities,
					[ modelName ]: {
						...state.entities[ modelName ],
						...entities,
					},
				},
				entityIds: {
					...state.entityIds,
					[ modelName ]: mergeAndDeDuplicateArrays(
						state.entityIds[ modelName ],
						keys( entities ),
					),
				},
			};
		}
	}
	return state;
}
