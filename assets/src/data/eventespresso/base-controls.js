/**
 * External imports
 */
import apiFetch from '@wordpress/api-fetch';
import {
	select as selectData,
	dispatch as dispatchData,
} from '@wordpress/data';

export function fetch( request ) {
	return {
		type: 'FETCH_FROM_API',
		request,
	};
}

export function select( reducerKey, selectorName, ...args ) {
	return {
		type: 'SELECT',
		reducerKey,
		selectorName,
		args,
	};
}

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
