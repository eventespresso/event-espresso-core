/**
 * Internal imports.
 */
import { fetch, default as baseControls } from '../base-controls';
import { REDUCER_KEY } from './constants';

/**
 * Returns the action object for a specific select control for the schema
 * resolver.
 * @param {string} selectorName
 * @param {...*} args
 * @return {{type: string, reducerKey: string, selectorName: string, args: *[]}}
 * returns an action object
 */
export function select( selectorName, ...args ) {
	return {
		type: 'SELECT',
		reducerKey: REDUCER_KEY,
		selectorName,
		args,
	};
}

export const fetchFromApi = fetch;
export default baseControls;
