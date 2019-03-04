/**
 * Internal imports
 */
import { dispatch, select } from '../../base-controls';
import { ACTION_TYPES } from './action-types';

const { resets: types } = ACTION_TYPES;

/**
 * Resets the entire state to its default for the store.
 */
export function* resetEntireState() {
	const
	yield {
		type: types.RESET_ALL_STATE,
	};

}

/**
 * Resets all state related to the given modelName
 *
 * Note: This does not reset any state in the modelSpecific tree as there is no
 * way to know what applies to the current model.
 *
 * @param {string} modelName
 * @return {Object} An action object
 */
export function resetStateForModel( modelName ) {
	return {
		type: types.RESET_STATE_FOR_MODEL,
		modelName,
	};
}

/**
 * Resets all model specific state.
 *
 * @return {Object} An action object
 */
export function resetAllModelSpecific() {
	return {
		type: types.RESET_ALL_MODEL_SPECIFIC,
	};
}

/**
 * Resets all state for a given model specific selector and its arguments.
 *
 * @param {string} selectorName
 * @param {Array} args
 * @return {Object} An action object.
 */
export function resetModelSpecificForSelector( selectorName, ...args ) {
	return {
		type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
		selectorName,
		args,
	};
}