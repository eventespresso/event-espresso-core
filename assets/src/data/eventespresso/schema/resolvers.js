/**
 * External dependencies
 */
import { isSchemaResponseOfModel } from '@eventespresso/validators';
import {
	getEndpoint,
	createEntityFactory,
	MODEL_PREFIXES,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';

/**
 * Internal dependencies
 */
import {
	receiveSchemaForModel,
	receiveFactoryForModel,
	receiveRelationEndpointForModelEntity,
} from './actions';
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
 * @param {Object} schema
 * @return {Object|null} retrieved factory
 */
export function* getFactoryForModel( modelName, schema = {} ) {
	if ( ! isSchemaResponseOfModel( schema, modelName ) ) {
		schema = yield getSchemaByModel( modelName );
	}
	if ( ! isSchemaResponseOfModel( schema, modelName ) ) {
		return null;
	}
	const factory = createEntityFactory(
		modelName,
		schema.schema,
		MODEL_PREFIXES( modelName )
	);
	yield receiveFactoryForModel( modelName, factory );
	return factory;
}

/**
 * A resolver for getting the relation endpoint for a given model, it's id, and
 * the requested relation.
 *
 * The EE REST api names relations according to whether they there are singular
 * or plural relations on a given model (eg. Registrations have one event
 * relation, but Events can have multiple datetimes).  This means the only way
 * to derive an accurate endpoint for a given relation request on an entity is
 * to retrieve the entity from the resource and derive the endpoint from the
 * links in the response.
 *
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationModelName
 * @return {IterableIterator<*>|string} A generator or the derived endpoint.
 */
export function* getRelationEndpointForEntityId(
	modelName,
	entityId,
	relationModelName
) {
	const response = yield fetchFromApi(
		{
			path: getEndpoint( modelName ) + '/' + entityId,
		}
	);
	const links = response._links || {};
	if ( ! links ) {
		return '';
	}
	const baseRelationPath = 'https://api.eventespresso.com/';
	let endpoint = links[
		baseRelationPath + singularModelName( relationModelName )
	] || '';
	endpoint = ( endpoint === '' && links[
		baseRelationPath + pluralModelName( relationModelName )
	] ) || endpoint;
	if ( endpoint ) {
		yield receiveRelationEndpointForModelEntity(
			modelName,
			entityId,
			relationModelName,
			endpoint
		);
	}
	return endpoint;
}

/**
 * A control for retrieving the schema for the given model
 * @param {string} modelName
 * @return {IterableIterator<*>|Object}  a generator or Object if schema is
 * retrieved.
 */
export function* getSchemaByModel( modelName ) {
	let schema;
	const resolved = yield select( 'hasResolvedSchemaForModel', modelName );
	if ( resolved === true ) {
		schema = yield select( 'getSchemaForModel', modelName );
		return schema;
	}
	schema = yield getSchemaForModel( modelName );
	yield receiveSchemaForModel( modelName, schema );
	return schema;
}
