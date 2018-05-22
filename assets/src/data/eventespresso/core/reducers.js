/**
 * External dependencies
 */
import { map, keys, difference, without } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal/objects';
import { combineReducers } from '@wordpress/data';
import { mergeAndDeDuplicateArrays } from '@eventespresso/eejs';

/**
 * Internal dependencies
 */
import {
	DEFAULT_CORE_STATE,
	getEntityPrimaryKeyValues,
	keyEntitiesByPrimaryKeyValue,
} from '../../model';

/**
 * Returns an array of dirty entity ids from the provided entities.
 *
 * @param { string } modelName
 * @param { Object } state
 * @param { Array } entities
 * @return { Array }  Returns an array.
 */
const getDirtyEntityIds = ( modelName, state, entities ) => {
	const dirty = [];
	let id;
	entities.forEach( function( entity ) {
		// dirty if not equal
		id = getEntityPrimaryKeyValues( modelName, entity );
		if ( state.entities.hasOwnProperty( modelName ) &&
			state.entities[ modelName ].hasOwnProperty( id ) &&
			! isShallowEqual( entity, state.entities[ modelName ][ id ] )
		) {
			dirty.push( String( id ) );
		}
	} );
	return dirty;
};

/**
 * This reducer sets the dirty property to false for all entity records matching
 * given entities in the state.  Entities themselves are NOT updated.
 *
 * Typically this would be used to flush the dirty state after multiple entities
 * have been persisted to the server.
 *
 * @param { Object } state
 * @param { Object } action
 * @return { Object }  The new state if dirty state is flushed and the original
 *                       state if not.
 */
export function cleanEntities( state = DEFAULT_CORE_STATE, action ) {
	const { type, modelName, entities: incomingEntities = [] } = action;
	if ( type === 'CLEAN_ENTITIES' &&
		state.dirty.hasOwnProperty( modelName ) ) {
		const entityIds = map(
			incomingEntities,
			function( entity ) {
				return String( getEntityPrimaryKeyValues( modelName, entity ) );
			},
		);
		return {
			...state,
			dirty: {
				...state.dirty,
				[ modelName ]: [
					...difference( state.dirty[ modelName ], entityIds ),
				],
			},
		};
	}
	return state;
}

/**
 * This reducer sets the dirty property to false for the entity record in the
 * state matching the provided entityId in the action object.
 *
 * @param { Object } state
 * @param { Object } action
 * @return { Object }  The new state if the entity record is flushed and the
 *                       original state if not.
 */
export function cleanEntityById( state = DEFAULT_CORE_STATE, action ) {
	const { type, modelName, entityId } = action;
	if ( type === 'CLEAN_ENTITY' &&
		state.dirty.hasOwnProperty( modelName ) &&
		state.entities.hasOwnProperty( modelName ) &&
		state.entities[ modelName ].hasOwnProperty( entityId )
	) {
		return {
			...state,
			dirty: {
				...state.dirty,
				[ modelName ]: [
					...without( state.dirty[ modelName ], String( entityId ) ),
				],
			}
			,
		};
	}
	return state;
}

/**
 * Receives entities and adds them to or updates them in the state.
 *
 * Any new entity entities are simply added.  Any entities matching existing
 * entities in the state are updated and if any properties of that entity differ
 * from what's already in the state the record is marked dirty.
 *
 * @param { Object } state
 * @param { Object } action
 * @return {*}  Returns original state if no additions or updates are done.
 *                Returns new state if additions or updates are done.
 */
export function receiveEntityRecords( state = DEFAULT_CORE_STATE, action ) {
	const { type, modelName, entities: incomingEntities = [] } = action;
	if ( type === 'RECEIVE_ENTITY_RECORDS' &&
		state.entities.hasOwnProperty( modelName ) ) {
		const entities = keyEntitiesByPrimaryKeyValue( modelName,
			incomingEntities,
		);
		const dirty = getDirtyEntityIds( modelName, state, incomingEntities );
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
			dirty: {
				...state.dirty,
				[ modelName ]: mergeAndDeDuplicateArrays(
					state.dirty[ modelName ],
					dirty,
				),
			},
		};
	}
	return state;
}

export default combineReducers(
	{
		cleanEntities,
		cleanEntityById,
		receiveEntityRecords,
	},
);
