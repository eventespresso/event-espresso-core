/**
 * External imports
 */
import { isEmpty, find } from 'lodash';
import {
	applyQueryString,
	getPrimaryKeyQueryString,
} from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { receiveResponse, receiveEntityResponse } from './actions';
import { fetch, select, dispatch } from '../base-controls';
import {
	getFactoryByModel,
	resolveGetEntityByIdForIds,
} from '../base-resolvers.js';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../core/constants';

/**
 * Resolver for generic items returned from an endpoint.
 *
 * @param {string} identifier  The identifier for the items.
 * @param {string} queryString  Additional query string parameters passed on to
 *   the REST request.
 */
export function* getItems( identifier, queryString ) {
	const items = yield fetch( {
		path: queryString,
	} );
	yield receiveResponse( identifier, queryString, items );
}

/**
 * Utility for handling an entity response and constructing BaseEntity
 * children from them.
 *
 * Note, this uses the entities stored in the eventespresso/core store as the
 * authority so if an entity already exists there, it replaces what was
 * retrieved from the server.
 *
 * @param {string} modelName
 * @param {Array} response
 * @return {IterableIterator<*>|Array<BaseEntity>}  An empty array if the
 * factory cannot be retrieved for the model.  Otherwise the constructed
 * entities.
 */
export function* buildAndDispatchEntitiesFromResponse( modelName, response ) {
	const factory = yield getFactoryByModel( modelName );
	if ( isEmpty( factory ) ) {
		return [];
	}
	let fullEntities = response.map( entity => factory.fromExisting( entity ) );
	const entityIds = fullEntities.map( entity => entity.id );
	// are there already entities for the ids in the store?  If so, we use those
	const existingEntities = yield select(
		CORE_REDUCER_KEY,
		'getEntitiesByIds',
		modelName,
		entityIds
	);
	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = fullEntities.map( ( entity ) => {
			return find( existingEntities, existingEntity => {
				return existingEntity.id === entity.id;
			} ) || entity;
		} );
	}
	yield dispatch(
		CORE_REDUCER_KEY,
		'receiveEntityRecords',
		modelName,
		fullEntities
	);
	yield resolveGetEntityByIdForIds( modelName, entityIds );
	return fullEntities;
}

/**
 * Resolver for model entities returned from an endpoint.
 * @param {string} modelName
 * @param {string} queryString
 * @return {IterableIterator<*>|Array<BaseEntity>} An empty array if no
 * entities retrieved.
 */
export function* getEntities( modelName, queryString ) {
	const response = yield fetch( {
		path: applyQueryString( modelName, queryString ),
	} );
	if ( isEmpty( response ) ) {
		return [];
	}
	const fullEntities = yield buildAndDispatchEntitiesFromResponse( modelName, response );
	yield receiveEntityResponse( modelName, queryString, fullEntities );
}

/**
 * Resolver for getting model entities for a given set of ids
 * @param {string} modelName
 * @param {Array<number>}ids
 * @return {IterableIterator<*>|Array} An empty array if no entities retrieved.
 */
export function* getEntitiesByIds( modelName, ids = [] ) {
	const queryString = getPrimaryKeyQueryString( modelName, ids );
	const response = yield fetch( {
		path: applyQueryString(
			modelName,
			queryString
		),
	} );
	if ( isEmpty( response ) ) {
		return [];
	}
	const fullEntities = yield buildAndDispatchEntitiesFromResponse( modelName, response );
	yield receiveEntityResponse( modelName, queryString, fullEntities );
}
