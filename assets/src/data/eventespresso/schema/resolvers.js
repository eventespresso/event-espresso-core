/**
 * Internal dependencies
 */
import { receiveSchemaForModel, receiveFactoryForModel } from './actions';
import { getEndpoint, createEntityFactory, MODEL_PREFIXES } from '../../model';
import { fetchFromApi, select } from './controls';

/**
 * A resolver for getting the schema for a given model name.
 * @param {string} modelName
 */
export function* getSchemaForModel( modelName ) {
	const path = getEndpoint( modelName );
	const schema = yield fetchFromApi( { path, method: 'OPTIONS' } );
	yield receiveSchemaForModel( modelName, schema );
}

/**
 * A resolver for getting the model entity factory for a given model name.
 * @param {string} modelName
 */
export function* getFactoryForModel( modelName ) {
	const schema = yield select( 'getSchemaForModel', modelName );
	const factory = createEntityFactory(
		modelName,
		schema.schema,
		MODEL_PREFIXES( modelName )
	);
	yield receiveFactoryForModel( modelName, factory );
}
