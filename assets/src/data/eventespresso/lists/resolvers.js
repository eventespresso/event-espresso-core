/**
 * External imports
 */
import { keys, isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { receiveResponse, receiveEntityResponse } from './actions';
import {
	applyQueryString,
	keyEntitiesByPrimaryKeyValue,
	createAndKeyEntitiesByPrimaryKeyValue,
} from '../../model';
import { fetch, select, dispatch } from '../base-controls';
import { getFactoryForModel } from '../schema/resolvers.js';
import { keepExistingEntitiesInObject } from '../base-entities';

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
 * Resolver for model entities returned from an endpoint.
 * @param {string} modelName
 * @param {string} queryString
 * @return {Object} an empty object if there are not entities retrieved from the
 * endpoint.
 */
export function* getEntities( modelName, queryString ) {
	let response = yield fetch( {
		path: applyQueryString( modelName, queryString ),
	} );
	if ( isEmpty( response ) ) {
		return {};
	}
	response = keyEntitiesByPrimaryKeyValue( modelName, response );
	let factory = yield select(
		'eventespresso/schema',
		'getFactoryForModel',
		modelName
	);
	if ( isEmpty( factory ) ) {
		factory = yield getFactoryForModel( modelName );
	}
	let fullEntities = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		response,
	);

	// are there already entities for the ids in the store?  If so, we use those
	const existingEntities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		keys( fullEntities )
	);

	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = keepExistingEntitiesInObject(
			existingEntities,
			fullEntities,
		);
	}
	yield dispatch(
		'eventespresso/core',
		'receiveEntityRecords',
		modelName,
		fullEntities
	);
	yield receiveEntityResponse( modelName, queryString, fullEntities );
}
