/**
 * External imports
 */
import { mergeAndDeDuplicateArrays } from '@eventespresso/eejs';
import { keys, reduce } from 'lodash';

/**
 * Internal imports
 */
import {
	DEFAULT_CORE_STATE,
	createAndKeyEntitiesByPrimaryKeyValue,
} from '../../model';

/**
 * This replaces any entities in the incoming object with matching entities (by
 * id) in the state (if they exist).
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Object} entities
 * @return {Object} New entities object.
 */
const replaceExistingEntitiesFromState = ( state, modelName, entities ) => {
	return reduce( entities, ( result, entity, entityId ) => {
		result[ entityId ] = state.entities[ modelName ][ entityId ] ?
			state.entities[ modelName ][ entityId ] :
			entity;
		return result;
	}, entities );
};

/**
 * A reducer returning the new state for action.
 * Handles receiving entity records from a rest response and converting them to
 * model entities using the provided factory.
 *
 * It is expected that the incoming entity records are indexed by the primary key
 * value for the entities.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {{entities: {}, entityIds: {}}} The new state (or the original if no
 * change detected or action isn't handled by this method)
 */
export default function receiveEntityRecords( state = DEFAULT_CORE_STATE, action ) {
	const { type, factory, entities: incomingEntities = {} } = action;
	if (
		factory.modelName &&
		factory.classDef &&
		state.entities[ factory.modelName ]
	) {
		let entities = createAndKeyEntitiesByPrimaryKeyValue(
				factory,
				incomingEntities,
			),
			updateState = false;
		switch ( type ) {
			case 'RECEIVE_ENTITY_RECORDS':
				// replace any incoming entities with existing entities already in the
				// store so this registry acts as the "authority" for the latest entity.
				entities = replaceExistingEntitiesFromState(
					state,
					factory.modelName,
					entities
				);
				updateState = true;
				break;
			case 'RECEIVE_AND_REPLACE_ENTITY_RECORDS':
				updateState = true;
				break;
		}
		if ( updateState ) {
			return {
				...state,
				entities: {
					...state.entities,
					[ factory.modelName ]: {
						...state.entities[ factory.modelName ],
						...entities,
					},
				},
				entityIds: {
					...state.entityIds,
					[ factory.modelName ]: mergeAndDeDuplicateArrays(
						state.entityIds[ factory.modelName ],
						keys( entities ),
					),
				},
			};
		}
	}
	return state;
}
