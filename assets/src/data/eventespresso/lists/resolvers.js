/**
 * External imports
 */
import { isEmpty } from 'lodash';

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
import { getFactoryForModel, getSchemaForModel } from '../schema/resolvers';
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

	// are there already entities for the ids in the store?  If so, we use those
	const existingEntities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		Array.from( fullEntities.keys() )
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

/**
 * Returns the factory for the given model from the eventespresso/schema store.
 *
 * @param {string} modelName
 * @return {IterableIterator<*>|Object} A generator or the object once the
 * factory is retrieved.
 */
function* getFactoryByModel( modelName ) {
	let factory;
	const resolved = yield select(
		'eventespresso/schema',
		'hasResolvedFactoryForModel',
		modelName
	);
	if ( resolved === true ) {
		factory = yield select(
			'eventespresso/schema',
			'getFactoryForModel',
			modelName
		);
		return factory;
	}
	const schema = yield getSchemaByModel( modelName );
	factory = yield getFactoryForModel( modelName, schema );
	yield dispatch(
		'eventespresso/schema',
		'receiveFactoryForModel',
		modelName,
		factory,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		'eventespresso/schema',
		'getFactoryForModel',
		[ modelName ]
	);
	return factory;
}

/**
 * Returns the schema for the given model from the eventespresso/schema store.
 *
 * @param {string} modelName
 * @return {IterableIterator<*>|Object} A generator of the object once the
 * schema is retrieved.
 */
function* getSchemaByModel( modelName ) {
	let schema;
	const resolved = yield select(
		'eventespresso/schema',
		'hasResolvedSchemaForModel',
		modelName
	);
	if ( resolved === true ) {
		schema = yield select(
			'eventespresso/schema',
			'getSchemaForModel',
			modelName
		);
		return schema;
	}
	schema = yield getSchemaForModel( modelName );
	yield dispatch(
		'eventespresso/schema',
		'receiveSchemaForModel',
		modelName,
		schema,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		'eventespresso/schema',
		'getSchemaForModel',
		[ modelName ]
	);
	return schema;
}
