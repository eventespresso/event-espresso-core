/**
 * Internal dependencies
 */
import {
	ACTION_TYPES as types,
	RESET_TYPES as resetTypes,
} from './action-types';

/**
 * External dependencies
 */
import { fromJS, Set, OrderedMap } from 'immutable';
import { DEFAULT_LISTS_STATE } from '@eventespresso/model';

/**
 * Reducer managing item list state.
 *
 * @param {Immutable.Map} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Immutable.Map}	Updated state.
 */
export function receiveListItems(
	state = fromJS( DEFAULT_LISTS_STATE ),
	action
) {
	const { type, identifier, queryString } = action;
	const path = [ identifier, queryString ];
	let { items } = action;
	let doUpdate = true,
		existingValues;
	switch ( type ) {
		case types.RECEIVE_LIST:
			existingValues = state.getIn( path ) || Set();
			items = existingValues.merge( items );
			break;
		case types.RECEIVE_ENTITY_LIST:
			existingValues = state.getIn( path ) || OrderedMap();
			items = existingValues.merge(
				items.map( ( entity ) => [ entity.id, entity ] )
			);
			break;
		case resetTypes.RESET_ALL_STATE:
			return fromJS( DEFAULT_LISTS_STATE );
		case resetTypes.RESET_STATE_FOR_IDENTIFIER:
			return state.delete( identifier );
		case resetTypes.RESET_SPECIFIC_STATE_FOR_IDENTIFIER:
			return state.deleteIn( [ identifier, queryString ] );
		default :
			doUpdate = false;
	}
	return doUpdate ?
		state.setIn( [ identifier, queryString ], items ) :
		state;
}

export default receiveListItems;
