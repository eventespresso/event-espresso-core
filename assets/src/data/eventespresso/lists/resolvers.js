/**
 * External imports
 */
import { keys } from 'lodash';

/**
 * Internal dependencies
 */
import { receiveResponse, receiveEntityResponse } from './actions';
import { applyQueryString, keyEntitiesByPrimaryKeyValue } from '../../model';
import { fetch, select, dispatch } from '../base-controls';

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
 */
export function* getEntities( modelName, queryString ) {
	let response = yield fetch( {
		path: applyQueryString( modelName, queryString ),
	} );
	response = keyEntitiesByPrimaryKeyValue( modelName, response );
	const factory = yield select(
		'eventespresso/schema',
		'getFactoryForModel',
		modelName
	);
	yield dispatch(
		'eventespresso/core',
		'receiveEntityRecords',
		factory,
		response
	);
	response = keys( response );
	const fullEntities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		modelName,
		response
	);
	yield receiveEntityResponse( modelName, queryString, fullEntities );
}
