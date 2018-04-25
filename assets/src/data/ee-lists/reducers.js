/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * Internal dependencies
 */
import { endpoints } from '../model/endpoints';

const DEFAULT_STATE = reduce( endpoints,
	function( defaultState, endpoint, modelName ) {
		defaultState[ modelName ] = [];
	},
	{},
);

/**
 * Reducer managing item list state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Object}	Updated state.
 *
 * @todo still need to work out how this will update/interact with the
 * `eventespresso/core-data` store.  We might want to have a special dispatched
 * action for that?
 */
export function listItems( state = DEFAULT_STATE, action ) {
	const { type, modelName, queryString, items = {} } = action;
	switch ( type ) {
		case 'SET_REQUESTED':
			if ( state[ modelName ].hasOwnProperty( queryString ) ) {
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
}

export default listItems;
