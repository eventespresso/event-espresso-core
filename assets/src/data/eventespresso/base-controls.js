/**
 * External imports
 */
import apiFetch from '@wordpress/api-fetch';
import {
	select as selectData,
	dispatch as dispatchData,
} from '@wordpress/data';

/**
 * Returns the action object for a fetch control.
 * @param {Object} request
 * @return {{type: string, request: Object}} An action object
 */
export function fetch( request ) {
	return {
		type: 'FETCH_FROM_API',
		request,
	};
}

/**
 * Returns the action object for a select control.
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {*[]} args
 * @return {{type: string, reducerKey: string, selectorName: string, args: *[]}}
 * Returns an action object.
 */
export function select( reducerKey, selectorName, ...args ) {
	return {
		type: 'SELECT',
		reducerKey,
		selectorName,
		args,
	};
}

/**
 * Returns the action object for a dispatch control.
 * @param {string} reducerKey
 * @param {string} dispatchName
 * @param {*[]} args
 * @return {{type: string, reducerKey: string, dispatchName: string, args: *[]}}
 * An action object
 */
export function dispatch( reducerKey, dispatchName, ...args ) {
	return {
		type: 'DISPATCH',
		reducerKey,
		dispatchName,
		args,
	};
}

const controls = {
	FETCH_FROM_API( { request } ) {
		return apiFetch( request );
	},
	SELECT( { reducerKey, selectorName, args } ) {
		return selectData( reducerKey )[ selectorName ]( ...args );
	},
	DISPATCH( { reducerKey, dispatchName, args } ) {
		return dispatchData( reducerKey )[ dispatchName ]( ...args );
	},
};

export default controls;
