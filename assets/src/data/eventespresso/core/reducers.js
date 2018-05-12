/**
 * External dependencies
 */
import { mapValues, pick, keys } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal/objects';
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	DEFAULT_STATE,
	getEntityPrimaryKeyValues,
	keyEntitiesByPrimaryKeyValue,
} from '../../model';

/**
 * Constructs a collection of entity records indexed by entity primary keys
 * and each record containing the entity object and a boolean to indicate its
 * "dirty" state.
 * A record is set to dirty if the entity passed in has an id match in the
 * existing state and differs from the entity in the existing state.
 *
 * @param { string } modelName
 * @param { Object } state
 * @param { Array } entities
 * @return {*}  Returns an object.
 */
const constructEntityRecordsAutoDirty = ( modelName, state, entities ) => {
	let dirty = false,
		primaryKey,
		entity;

	return mapValues( entities, function( entityRecord ) {
		// ensure we have the entity record
		entity = entityRecord.hasOwnProperty( 'entity' ) ?
			entityRecord.entity :
			entityRecord;

		// dirty if not equal
		primaryKey = getEntityPrimaryKeyValues( modelName, entity );
		dirty = state.hasOwnProperty( modelName ) &&
			state[ modelName ].hasOwnProperty( primaryKey ) &&
			! isShallowEqual( entity, state[ modelName ][ primaryKey ].entity );
		return {
			entity,
			dirty,
		};
	} );
};

/**
 * Constructs entity records for the given entities and sets them all to the
 * provided dirty state.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @param { boolean } dirty
 * @return {*} Returns a collection indexed by entity primary key with each
 *            object in the collection containing an entity and its dirty state.
 */
const constructEntityRecords = ( modelName, entities, dirty ) => {
	let entity;
	return mapValues( entities, function( entityRecord ) {
		// ensure we have the entity from the record
		entity = entityRecord.hasOwnProperty( 'entity' ) ?
			entityRecord.entity :
			entityRecord;
		return {
			entity,
			dirty,
		};
	} );
};

/**
 * Recieves state and entities and returns any matching entities within
 * the state.
 *
 * @param { string } modelName
 * @param { Object } state
 * @param { Array }  entities
 * @return {*}  A new collection of entities matching what already exists in the
 *                state.
 */
const getMatchingStateEntities = ( modelName, state, entities ) => {
	entities = keyEntitiesByPrimaryKeyValue( modelName, entities );
	return pick( state[ modelName ], keys( entities ) );
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
export function cleanEntities( state = DEFAULT_STATE, action ) {
	const { type, modelName, entities: incomingEntities = [] } = action;
	if ( type === 'CLEAN_ENTITIES' && state.hasOwnProperty( modelName ) ) {
		const entities = constructEntityRecords(
			modelName,
			getMatchingStateEntities( modelName, state, incomingEntities ),
			false,
		);
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				...entities,
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
export function cleanEntityById( state = DEFAULT_STATE, action ) {
	const { type, modelName, entityId } = action;
	const id = String( entityId );
	if ( type === 'CLEAN_ENTITY' &&
		state.hasOwnProperty( modelName ) &&
		state[ modelName ].hasOwnProperty( id )
	) {
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				[ id ]: {
					...state[ modelName ][ id ],
					dirty: false,
				},
			},
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
export function receiveEntityRecords( state = DEFAULT_STATE, action ) {
	const { type, modelName, entities: incomingEntities = [] } = action;
	if ( type === 'RECEIVE_ENTITY_RECORDS' &&
		state.hasOwnProperty( modelName ) ) {
		const entities = constructEntityRecordsAutoDirty(
			modelName,
			state,
			keyEntitiesByPrimaryKeyValue( modelName, incomingEntities ),
		);
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				...entities,
			},
		};
	}
	return state;
}

export default combineReducers(
	cleanEntities,
	cleanEntityById,
	receiveEntityRecords
);
