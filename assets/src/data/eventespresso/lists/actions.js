/**
 * External imports
 */
import { select as dataSelect } from '@wordpress/data';
import { singularModelName, pluralModelName } from '@eventespresso/model';

/**
 * Internal imports
 */
import {
	ACTION_TYPES as types,
	RESET_TYPES as resetTypes,
} from './action-types';
import { dispatch, select } from '../base-controls';
import { REDUCER_KEY } from './constants';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {string} identifier
 * @param {string} queryString  Results are stored indexed by the query
 * string generating them.
 * @param {Array<*>} items     items attached with the list.
 * @return {
 * 	{
 * 		type: string,
 * 		identifier: string,
 * 		queryString: string,
 * 		items: Array<*>
 *	}
 * } Object for action.
 */
export function receiveResponse( identifier, queryString, items = [] ) {
	return {
		type: types.RECEIVE_LIST,
		identifier,
		queryString,
		items,
	};
}

/**
 * Returns an action object used in updating the store with the provided entity
 * items retrieved from a request using the given query string.
 *
 * @param {string} modelName
 * @param {string} queryString
 * @param {Array<BaseEntity>}entities
 * @return {{type: string, identifier: string, queryString: string, items:
 *   Array<BaseEntity>}} An action object.
 */
export function receiveEntityResponse(
	modelName,
	queryString,
	entities = [],
) {
	return {
		type: types.RECEIVE_ENTITY_LIST,
		identifier: modelName,
		queryString,
		items: entities,
	};
}

/**
 * Action triggering resetting all state in the store.
 */
export function* resetAllState() {
	// action for resetting the entire state
	yield {
		type: resetTypes.RESET_ALL_STATE,
	};

	if ( invalidateActionsAvailable() ) {
		yield dispatch(
			'core/data',
			'invalidateResolutionForStore',
			REDUCER_KEY,
		);
		return;
	}

	// get resolvers from core/data and dispatch invalidation of each resolver.
	const resolvers = yield select(
		'core/data',
		'getCachedResolvers',
		REDUCER_KEY
	);

	// dispatch invalidation of the cached resolvers
	for ( const selector in resolvers ) {
		for ( const entry of resolvers[ selector ]._map ) {
			yield dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				selector,
				entry[ 0 ]
			);
		}
	}
}

/**
 * Action triggering resetting state in the store for the given selector name
 * and identifier
 *
 * @param {string} selectorName
 * @param {string} identifier
 */
export function* resetForSelectorAndIdentifier( selectorName, identifier ) {
	yield {
		type: resetTypes.RESET_STATE_FOR_IDENTIFIER,
		identifier,
	};

	// get resolvers from core/data
	const resolvers = yield select(
		'core/data',
		'getCachedResolvers',
		REDUCER_KEY
	);

	// dispatch invalidation of the cached resolvers for any resolver that
	// has a variation of modelName in the selector name or in the args for the
	// cached resolver.
	for ( const selector in resolvers ) {
		if (
			selectorName === selector ||
			identifierInSelector( selector, identifier )
		) {
			for ( const entry of resolvers[ selector ]._map ) {
				if ( entry[ 0 ][ 0 ] === identifier ) {
					yield dispatch(
						'core/data',
						'invalidateResolution',
						REDUCER_KEY,
						selector,
						entry[ 0 ],
					);
				}
			}
		}
	}
}

/**
 * Action triggering the state reset for the "generic" selector ('getItems') and
 * it's identifier
 *
 * @param {string} identifier
 */
export function* resetGenericItemsWithIdentifier( identifier ) {
	yield* resetForSelectorAndIdentifier( 'getItems', identifier );
}

/**
 * Action triggering the state reset for the entity selectors for the given
 * modelName
 *
 * @param {string} modelName
 */
export function* resetEntitiesForModelName( modelName ) {
	yield* resetForSelectorAndIdentifier( 'getEntities', modelName );
	yield* resetForSelectorAndIdentifier( 'getEntitiesByIds', modelName );
}

/**
 * Action triggering the state reset for the specific selector name, identifier
 * and query string.
 *
 * @param {string} selectorName
 * @param {string} identifier
 * @param {string} queryString
 */
export function* resetSpecificStateForSelector(
	selectorName,
	identifier,
	queryString
) {
	yield {
		type: resetTypes.RESET_SPECIFIC_STATE_FOR_IDENTIFIER,
		identifier,
		queryString,
	};

	yield dispatch(
		'core/data',
		'invalidateResolution',
		REDUCER_KEY,
		selectorName,
		[ identifier, queryString ]
	);
}

/**
 * Helper for determining if actions are available in the `core/data` package.
 *
 * @return {boolean}  True means additional invalidation actions available.
 */
const invalidateActionsAvailable = () => {
	return dataSelect( 'core/data' ).invalidateResolutionForStore !== undefined;
};

/**
 * Helper for determining whether the given identifier is found in the given
 * selectorName.
 *
 * @param {string} selectorName
 * @param {string} identifier
 * @return {boolean} True means it is present, false means it isn't
 */
const identifierInSelector = ( selectorName, identifier ) => {
	if ( selectorName === 'getItems' ) {
		return false;
	}
	const singularName = singularModelName( identifier );
	const pluralName = pluralModelName( identifier );
	selectorName = selectorName.toLowerCase();
	return selectorName.indexOf( singularName ) > -1 ||
		selectorName.indexOf( pluralName ) > -1;
};
