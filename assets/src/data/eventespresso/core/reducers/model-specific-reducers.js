/**
 * External imports
 */
import { Map } from 'immutable';

import { ACTION_TYPES } from '../actions/action-types';
const { modelSpecific: types } = ACTION_TYPES;

/**
 * Handle receiving a model specific selector record into the state.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} New or existing state.
 */
export default function handleReceiveSelector( state = Map(), action ) {
	const {
		type,
		selector,
		args,
		value,
	} = action;
	if ( type === types.RECEIVE_SELECTOR_VALUE ) {
		return state.setIn( [ selector, JSON.stringify( args ) ], value );
	}
	return state;
}
