/**
 * External imports
 */
import { Map } from 'immutable';

import { ACTION_TYPES } from '../actions/action-types';
const { modelSpecific: types, resets: resetTypes } = ACTION_TYPES;

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
	switch ( type ) {
		case types.RECEIVE_SELECTOR_VALUE:
			return state.setIn( [ selector, JSON.stringify( args ) ], value );
		case resetTypes.RESET_ALL_MODEL_SPECIFIC:
		case resetTypes.RESET_ALL_STATE:
			return Map();
		case resetTypes.RESET_MODEL_SPECIFIC_FOR_SELECTOR:
			return state.delete( selector );
		case resetTypes.RESET_MODEL_SPECIFIC_FOR_SELECTOR_AND_ARGS:
			return state.deleteIn( [ selector, JSON.stringify( args ) ] );
	}
	return state;
}
