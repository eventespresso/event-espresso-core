/**
 * External dependencies
 */
import {
	isSchemaResponseOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import {
	getEndpoint,
	stripBaseRouteFromUrl,
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
import { fetch, resolveSelect } from '../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from './constants';

/**
 * A resolver for getting the schema for a given model name.
 * @param {string} modelName
 * @return {Object} Retrieved schema.
 */
export function* getSchemaForModel( modelName ) {
	const path = getEndpoint( modelName );
	const schema = yield fetch( { path, method: 'OPTIONS' } );
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
		schema = yield resolveSelect(
			SCHEMA_REDUCER_KEY,
			'getSchemaForModel',
			modelName
		);
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
	// first attempt to get the relation endpoint from the entity that might
	// already be in core state.
	const entity = yield resolveSelect(
		CORE_REDUCER_KEY,
		'getEntityById',
		modelName,
		entityId
	);
	const pluralRelationName = pluralModelName( relationModelName );
	let endpoint = '';
	if ( isModelEntity( entity ) && entity[ pluralRelationName + 'Resource' ] ) {
		endpoint = stripBaseRouteFromUrl(
			entity[ pluralRelationName + 'Resource' ].resourceLink
		);
	} else {
		const response = yield fetch(
			{
				path: getEndpoint( modelName ) + '/' + entityId,
			}
		);
		if ( ! response._links ) {
			return '';
		}
		const links = response._links || {};
		const baseRelationPath = 'https://api.eventespresso.com/';
		endpoint = links[
			baseRelationPath + singularModelName( relationModelName )
		] || '';
		endpoint = ( endpoint === '' && links[
			baseRelationPath + pluralRelationName
		] ) || endpoint;
	}
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
