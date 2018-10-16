/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { receiveSchemaForModel, receiveFactoryForModel } from './actions';
import { getEndpoint, createEntityFactory, MODEL_PREFIXES } from '../../model';
import { fetchFromApi, select } from './controls';

/**
 * A resolver for getting the schema for a given model name.
 * @param {string} modelName
 * @return {Object} Retrieved schema.
 */
export function* getSchemaForModel( modelName ) {
	const path = getEndpoint( modelName );
	const schema = yield fetchFromApi( { path, method: 'OPTIONS' } );
	yield receiveSchemaForModel( modelName, schema );
	return schema;
}

/**
 * A resolver for getting the model entity factory for a given model name.
 * @param {string} modelName
 * @return {Object} retrieved factory
 */
export function* getFactoryForModel( modelName ) {
	let schema = yield select( 'getSchemaForModel', modelName );
	if ( isEmpty( schema ) ) {
		schema = yield getSchemaForModel( modelName );
	}
	const factory = createEntityFactory(
		modelName,
		schema.schema,
		MODEL_PREFIXES( modelName )
	);
	yield receiveFactoryForModel( modelName, factory );
	return factory;
}
