/**
 * External imports
 */
import apiFetch from '@wordpress/api-fetch';
import {
	select as selectData,
	dispatch as dispatchData,
	subscribe,
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
 * Returns the action object for resolving a selector that has a resolver.
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {Array} args
 * @return {Object} An action object.
 */
export function resolveSelect( reducerKey, selectorName, ...args ) {
	return {
		type: 'RESOLVE_SELECT',
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
	RESOLVE_SELECT( { reducerKey, selectorName, args } ) {
		return new Promise( ( resolve ) => {
			const hasFinished = () => selectData( 'core/data' )
				.hasFinishedResolution( reducerKey, selectorName, args );
			const getResult = () => selectData( reducerKey )[ selectorName ]
				.apply( null, args );

			// trigger the selector (to trigger the resolver)
			const result = getResult();
			if ( hasFinished() ) {
				return resolve( result );
			}

			const unsubscribe = subscribe( () => {
				if ( hasFinished() ) {
					unsubscribe();
					resolve( getResult() );
				}
			} );
		} );
	},
};

export default controls;
