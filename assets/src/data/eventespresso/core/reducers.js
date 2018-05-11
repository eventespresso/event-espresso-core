/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';
import { mapValues, pick, keys } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal/objects';

/**
 * Internal dependencies
 */
import {
	DEFAULT_STATE,
	getEntityPrimaryKeyValues,
	keyEntitiesByPrimaryKeyValue,
} from '../../model';

const constructEntityRecords = ( modelName, entities, dirty ) => {
	return mapValues( entities, function( entity ) {
		return {
			entity,
			dirty,
		};
	} );
};

const constructEntityRecordsAutoDirty = ( modelName, state, entities ) => {
	let dirty = false,
		primaryKey;

	return mapValues( entities, function( entity ) {
		// dirty if not equal
		primaryKey = getEntityPrimaryKeyValues( modelName, entity );
		dirty = state.hasOwnProperty[ modelName ] &&
			state[ modelName ].hasOwnProperty( primaryKey ) &&
			! isShallowEqual( entity, state );
		return {
			entity,
			dirty,
		};
	} );
};

const getMatchingStateEntities = ( modelName, state, entities ) => {
	entities = keyEntitiesByPrimaryKeyValue( modelName, entities );
	return pick( state[ modelName ], keys( entities ) );
};

/**
 * A reducer for setting a single entity dirty.
 *
 * @param {Object} state
 * @param {Object} action
 * @return {{}} A new state object with the provided entity dirty state
 *   modified.
 */
export function setEntityDirty( state = DEFAULT_STATE, action ) {
	const { type, modelName, dirty, entity } = action;
	const primaryKeyValues = getEntityPrimaryKeyValues( modelName, entity );
	if ( type === 'SET_DIRTY' &&
		state.hasOwnProperty( modelName ) &&
		state[ modelName ].hasOwnProperty( primaryKeyValues )
	) {
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				[ primaryKeyValues ]: {
					...state[ modelName ][ primaryKeyValues ],
					dirty,
				},
			},
		};
	}
	return state;
}

export function setEntityDirtyById( state = DEFAULT_STATE, action ) {
	const { type, modelName, dirty, entityId } = action;
	const id = String( entityId );
	if ( type === 'SET_DIRTY'
		&& state.hasOwnProperty( modelName )
		&& state[ modelName ].hasOwnProperty( id )
	) {
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				[ id ]: {
					...state[ modelName ][ primaryKeyValues ],
					dirty,
				},
			},
		};
	}
}

export function setEntitiesDirty( state = DEFAULT_STATE, action ) {
	const { type, modelName, dirty, entities: incomingEntities = [] } = action;
	if ( type === 'SET_DIRTY' && state.hasOwnProperty( modelName ) ) {
		const entities = constructEntityRecords(
			modelName,
			getMatchingStateEntities( modelName, state, incomingEntities ),
			dirty,
		);
		return {
			...state,
			[ modelName ]: {
				...state[ modelName ],
				entities,
			},
		};
	}
}

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
				entities,
			},
		};
	}
}

export default combineReducers( {
	setEntityDirty,
	setEntitiesDirty,
	receiveEntityRecords,
} );
