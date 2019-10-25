/**
 * External imports
 */
import apiFetch from '@wordpress/api-fetch';
import {
	select as selectData,
	dispatch as dispatchData,
	subscribe,
} from '@wordpress/data';
import { pluralModelName } from '@eventespresso/model';

/**
 * Internal imports
 */
import { REDUCER_KEY as CORE_REDUCER_KEY } from './core/constants';

/**
 * Returns the action object for a fetch control.
 *
 * @param {Object} request
 * @return {{
 *      type: string,
 *      request: Object
 * }}
 * An action object
 */
export function fetch( request ) {
	console.log(
		'%c fetch request',
		'color: #ff0066; font-size:24px;',
		request
	);
	return {
		type: 'FETCH_FROM_API',
		request,
	};
}

/**
 * Returns the action object for a select control.
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {...Array|boolean|number|Object|string} args
 * @return {{
 *      type: string,
 *      reducerKey: string,
 *      selectorName: string,
 *      args: ...Array|boolean|number|Object|string
 * }}
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
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {...Array|boolean|number|Object|string} args
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
 *
 * @param {string} reducerKey
 * @param {string} dispatchName
 * @param {...Array|boolean|number|Object|string} args
 * @return {{
 *      type: string,
 *      reducerKey: string,
 *      dispatchName: string,
 *      args: ...Array|boolean|number|Object|string
 * }}
 * An action object
 */
export function dispatch( reducerKey, dispatchName, ...args ) {
	console.log(
		'%c dispatch %c' + dispatchName +
		'%c reducerKey: %c' + reducerKey +
		'%c args: ',
		'color: Yellow; font-size:12px;',
		'color: Khaki; font-size:14px;',
		'color: Grey;',
		'color: Khaki;',
		'color: Grey;',
		args
	);
	return {
		type: 'DISPATCH',
		reducerKey,
		dispatchName,
		args,
	};
}

/**
 * Returns the action object for a resolve dispatch control
 *
 * @param {string} reducerKey
 * @param {string} dispatchName
 * @param {...Array|boolean|number|Object|string} args
 * @return {Object} The action object.
 */
export function resolveDispatch( reducerKey, dispatchName, ...args ) {
	return {
		type: 'RESOLVE_DISPATCH',
		reducerKey,
		dispatchName,
		args,
	};
}

/**
 * Returns the action object for resolving the getEntityById selector
 * for all the given ids on the given model
 *
 * @param {string} modelName
 * @param {Array} entityIds
 * @return {Object} An action object
 */
export function resolveGetEntityByIdForIds( modelName, entityIds ) {
	return {
		type: 'RESOLVE_GET_ENTITY_BY_ID_FOR_IDS',
		modelName,
		entityIds,
	};
}

/**
 * Returns the action object for resolving the getRelatedEntities selector
 * on the eventespresso/core store for the given arguments.
 *
 * @param {BaseEntity|Object} entity
 * @param {Map} relationEntities
 * @param {Array<number>} relationIds
 * @return {Object} An action object
 */
export function resolveGetRelatedEntities(
	entity,
	relationEntities,
	relationIds
) {
	return {
		type: 'RESOLVE_GET_RELATED_ENTITIES',
		entity,
		relationEntities,
		relationIds,
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
	async RESOLVE_DISPATCH( { reducerKey, dispatchName, args } ) {
		return await dispatchData( reducerKey )[ dispatchName ]( ...args );
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
	RESOLVE_GET_ENTITY_BY_ID_FOR_IDS( { modelName, entityIds } ) {
		while ( entityIds.length > 0 ) {
			dispatchData(
				'core/data',
				'finishResolution',
				CORE_REDUCER_KEY,
				'getEntityById',
				[ modelName, entityIds.pop() ]
			);
		}
	},
	RESOLVE_GET_RELATED_ENTITIES( { entity, relationEntities, relationIds } ) {
		while ( relationIds.length > 0 ) {
			const relationEntity = relationEntities.get( relationIds.pop() );
			if ( relationEntity ) {
				dispatchData(
					'core/data',
					'finishResolution',
					CORE_REDUCER_KEY,
					'getRelatedEntities',
					[ relationEntity, pluralModelName( entity.modelName ) ]
				);
			}
		}
	},
};

export default controls;
