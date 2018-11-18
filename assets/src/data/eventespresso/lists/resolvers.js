/**
 * External imports
 */
import { isEmpty } from 'lodash';
import {
	applyQueryString,
	keyEntitiesByPrimaryKeyValue,
	createAndKeyEntitiesByPrimaryKeyValue,
} from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { receiveResponse, receiveEntityResponse } from './actions';
import { fetch, select, dispatch } from '../base-controls';
import { getFactoryByModel } from '../base-resolvers.js';
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
 * @return {void} if there are not entities retrieved from the endpoint.
 */
export function* getEntities( modelName, queryString ) {
	let response = yield fetch( {
		path: applyQueryString( modelName, queryString ),
	} );
	if ( isEmpty( response ) ) {
		return;
	}
	response = keyEntitiesByPrimaryKeyValue( modelName, response );

	const factory = yield getFactoryByModel( modelName );
	if ( isEmpty( factory ) ) {
		return;
	}
	let fullEntities = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		response,
	);

	const entityIds = Array.from( fullEntities.keys() );

	// are there already entities for the ids in the store?  If so, we use those
	const existingEntities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		entityIds
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
	yield resolveGetEntityByIdForIds( modelName, entityIds );
	yield receiveEntityResponse( modelName, queryString, fullEntities );
}

/**
 * Handles ensuring that the resolution state for the `getEntityById` for all
 * provided entityIds is recorded as finished.
 *
 * @param {string} modelName
 * @param {Array} entityIds
 */
function* resolveGetEntityByIdForIds( modelName, entityIds ) {
	while ( entityIds.length > 0 ) {
		yield dispatch(
			'core/data',
			'finishResolution',
			'eventespresso/core',
			'getEntityById',
			[ modelName, entityIds.shift() ]
		);
	}
}
