/**
 * External imports
 */
import { DEFAULT_CORE_STATE } from '@eventespresso/model';
import { combineReducers } from '@wordpress/data';
import dirtyRelations from './dirty-relations';
import { without } from 'lodash';

function deleteEntity( state = DEFAULT_CORE_STATE.dirty.delete, action ) {
	const { type, modelName, entityId } = action;

	switch ( type ) {
		case 'RECEIVE_DELETE_ENTITY_ID':
			state = {
				...state,
				[ modelName ]: [
					...state[ modelName ],
					entityId,
				],
			};
			break;
		case 'REMOVE_DELETE_ENTITY_ID':
			if (
				state[ modelName ] &&
				state[ modelName ].indexOf( entityId ) > -1
			) {
				state[ modelName ] = without( state[ modelName ], entityId );
				if ( state[ modelName ].length === 0 ) {
					delete state[ modelName ];
				}
			}
			break;
	}
	return state;
}

function trashEntity( state = DEFAULT_CORE_STATE.dirty.trash, action ) {
	const { type, modelName, entityId } = action;

	switch ( type ) {
		case 'RECEIVE_TRASH_ENTITY_ID':
			state = {
				...state,
				[ modelName ]: [
					...state[ modelName ],
					entityId,
				],
			};
			break;
		case 'REMOVE_TRASH_ENTITY_ID':
			if (
				state[ modelName ] &&
				state[ modelName ].indexOf( entityId ) > -1
			) {
				state[ modelName ] = without( state[ modelName ], entityId );
				if ( state[ modelName ].length === 0 ) {
					delete state[ modelName ];
				}
			}
			break;
	}
	return state;
}

export default combineReducers( {
	delete: deleteEntity,
	trash: trashEntity,
	relations: dirtyRelations,
} );
