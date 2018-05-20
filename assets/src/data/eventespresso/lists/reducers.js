/**
 * Internal dependencies
 */
import { DEFAULT_LISTS_STATE } from '../../model';

/**
 * External dependencies
 */
import { isEqual } from 'lodash';

/**
 * Returns whether the state matches the provided items.
 * @param { Object } state
 * @param { string } modelName
 * @param { string } queryString
 * @param { Array } items
 * @return { boolean } If the items are in state and they match, then true.
 */
const stateMatchesItems = ( state, modelName, queryString, items = [] ) => (
	state[ modelName ].hasOwnProperty( queryString ) &&
	isEqual( state[ modelName ][ queryString ], items )
);

/**
 * Reducer managing item list state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Object}	Updated state.
 */
export function listItems( state = DEFAULT_LISTS_STATE, action ) {
	const { type, modelName, queryString, items = [] } = action;
	switch ( type ) {
		case 'RECEIVE_LIST':
			return stateMatchesItems( state, modelName, queryString, items ) ?
				state :
				{
					...state,
					[ modelName ]: {
						...state[ modelName ],
						[ queryString ]: items,
					},
				};
	}
	return state;
}

export default listItems;
