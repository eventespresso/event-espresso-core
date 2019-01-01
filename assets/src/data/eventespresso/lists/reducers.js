/**
 * Internal dependencies
 */
import { DEFAULT_LISTS_STATE } from '../../model';

/**
 * External dependencies
 */
import { fromJS, Set, OrderedMap } from 'immutable';

/**
 * Reducer managing item list state.
 *
 * @param {Map} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Map}	Updated state.
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
		case 'RECEIVE_LIST':
			existingValues = state.getIn( path ) || Set();
			items = existingValues.merge( items );
			break;
		case 'RECEIVE_ENTITY_LIST':
			existingValues = state.getIn( path ) || OrderedMap();
			items = existingValues.merge(
				items.map( entity => [ entity.id, entity ] )
			);
			break;
		default :
			doUpdate = false;
	}
	return doUpdate ?
		state.setIn( [ identifier, queryString ], items ) :
		state;
}

export default receiveListItems;
