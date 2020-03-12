/**
 * Internal imports
 */
import { ACTION_TYPES } from '../actions/action-types';
const { modelSpecific: types } = ACTION_TYPES;

/**
 * Action for adding the results of a specific selector and its value to the
 * state.
 * @param {string} selector
 * @param {*} value
 * @param {Array} args
 * @return {Object} An action object
 */
export function receiveSelectorValue( selector, value, ...args ) {
	return {
		type: types.RECEIVE_SELECTOR_VALUE,
		selector,
		args,
		value,
	};
}
