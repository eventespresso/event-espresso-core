/**
 * Internal dependencies
 */
import { DEFAULT_LISTS_STATE } from '../../model';

/**
 * External dependencies
 */
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Returns whether the state matches the provided items.
 * @param {Object} state
 * @param {string} identifier
 * @param {string} queryString
 * @param {Array} items
 * @return {boolean} If the items are in state and they match, then true.
 */
const stateMatchesItems = ( state, identifier, queryString, items = [] ) => (
	state[ identifier ] &&
	state[ identifier ][ queryString ] &&
	isShallowEqual( state[ identifier ][ queryString ], items )
);

/**
 * Returns whether there is a match for incoming entities against what is
 * currently in state.  The match is performed against the keys (ids) for the
 * entities
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} queryString
 * @param { Map<number|string,Object>} entities
 * @return {boolean} If the incoming entity keys match the entity keys currently
 * in the state for the given queryString and modelName then this returns true.
 */
const stateMatchesEntities = (
	state,
	modelName,
	queryString,
	entities = new Map()
) => (
	state[ modelName ] &&
	state[ modelName ][ queryString ] &&
	isShallowEqual(
		Array.from( state[ modelName ][ queryString ].keys() ),
		Array.from( entities.keys() ),
	)
);

/**
 * Reducer managing item list state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Object}	Updated state.
 */
export function receiveListItems( state = DEFAULT_LISTS_STATE, action ) {
	const { type, identifier, queryString, items = {} } = action;
	let matcher;
	switch ( type ) {
		case 'RECEIVE_LIST':
			matcher = stateMatchesItems;
			break;
		case 'RECEIVE_ENTITY_LIST':
			matcher = stateMatchesEntities;
			break;
		default :
			matcher = null;
	}
	if ( matcher !== null ) {
		return matcher( state, identifier, queryString, items ) ?
			state :
			{
				...state,
				[ identifier ]: {
					...state[ identifier ],
					[ queryString ]: items,
				},
			};
	}
	return state;
}

export default receiveListItems;
