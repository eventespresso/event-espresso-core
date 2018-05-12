/**
 * Internal dependencies
 */
import { DEFAULT_STATE } from '../../model';

/**
 * Reducer managing item list state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Object}	Updated state.
 */
export function listItems( state = DEFAULT_STATE, action ) {
	const { type, modelName, queryString, items = [] } = action;
	switch ( type ) {
		case 'SET_REQUESTED':
			if ( ! state[ modelName ] || state[ modelName ].hasOwnProperty( queryString ) ) {
				return state;
			}
			return {
				...state,
				[ modelName ]: {
					[ queryString ]: null,
				},
			};
		case 'RECEIVE_LIST':
			return {
				...state,
				[ modelName ]: {
					[ queryString ]: items,
				},
			};
	}
	return state;
}

export default listItems;
