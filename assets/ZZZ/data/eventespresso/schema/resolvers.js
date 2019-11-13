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
	singularModelName,
	pluralModelName,
	getPrimaryKey,
	modelNameForQueryString,
} from '@eventespresso/model';
import { isUndefined } from 'lodash';

/**
 * Internal dependencies
 */
import {
	receiveSchemaForModelAndResolve,
	receiveFactoryForModelAndResolve,
	receiveRelationEndpointForModelEntity,
	receiveRelationSchema,
	receiveRelationSchemaAndResolve,
} from './actions';
import { fetch, resolveSelect } from '../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../core/constants';
import {
	REDUCER_KEY as SCHEMA_REDUCER_KEY,
	JOIN_RELATION_TYPES,
} from './constants';

/**
 * A resolver for getting the schema for a given model name.
 *
 * @param {string} modelName
 * @return {Object} Retrieved schema.
 */
export function* getSchemaForModel( modelName ) {
	const path = getEndpoint( singularModelName( modelName ) );
	const schema = yield fetch( { path, method: 'OPTIONS' } );
	yield* receiveSchemaForModelAndResolve( modelName, schema );
	return schema;
}

/**
 * A resolver for getting the model entity factory for a given model name.
 *
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
		if ( ! isSchemaResponseOfModel( schema, modelName ) ) {
			return null;
		}
	}
	const factory = createEntityFactory(
		modelName,
		schema.schema,
		MODEL_PREFIXES( modelName )
	);
	yield* receiveFactoryForModelAndResolve( modelName, factory );
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
	relationModelName = singularModelName( relationModelName );
	const pluralRelationName = pluralModelName( relationModelName );
	let endpoint = '';
	if ( isModelEntity( entity ) && entity[ pluralRelationName + 'Resource' ] ) {
		endpoint = stripBaseRouteFromUrl(
			entity[ pluralRelationName + 'Resource' ].resourceLink
		);
	} else {
		const path = getEndpoint( modelName ) + '/' + entityId;
		const response = yield fetch( { path } );
		if ( ! response._links ) {
			return '';
		}
		const links = response._links || {};
		const baseRelationPath = 'https://api.eventespresso.com/';
		endpoint = links[
			baseRelationPath + relationModelName
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

/**
 * A resolver for getting the primary key string to use in a query for the given
 * model and relation. This considers the join type for the relation.
 *
 * @see the `getRelationPrimaryKeyString` selector for example.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {string} The primary key string to use or an empty string if relation
 * type could not be determined.
 */
export function* getRelationPrimaryKeyString( modelName, relationName ) {
	// normalize
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationType = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationType',
		modelName,
		relationName
	);
	if ( relationType === '' ) {
		return '';
	}
	const relationPrimaryKey = getPrimaryKey( relationName );
	return relationType === 'EE_Belongs_To_Relation' ?
		relationPrimaryKey :
		`${ modelNameForQueryString( relationName ) }.${ relationPrimaryKey }`;
}

/**
 * A resolver for returning what the expected response type is for the given
 * relation.
 *
 * @param {string} modelName  The model the relation is for.
 * @param {string} relationName The model name the relation is to.
 * @return {string} The type of the relation.
 */
export function* getRelationResponseType( modelName, relationName ) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationSchema = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationSchema',
		modelName,
		relationName,
	);
	return relationSchema !== null ? relationSchema.type : '';
}

/**
 * A resolver for returning whether the given modelName and relationName have
 * a join table for representing their relation.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {boolean}  True means there is a join table, false means there isn't.
 */
export function* hasJoinTableRelation( modelName, relationName ) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationType = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationType',
		modelName,
		relationName,
	);
	return JOIN_RELATION_TYPES.indexOf( relationType ) > -1;
}

/**
 * A resolver for getting the relation type describing the relation between
 * modelName and relationName
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {string}  The relation type to describe the relation
 */
export function* getRelationType( modelName, relationName ) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationSchema = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationSchema',
		modelName,
		relationName
	);
	return relationSchema !== null ? relationSchema.relation_type : '';
}

/**
 * A resolver for retrieving the relation schema from the server for the given
 * modelName and relationName.
 *
 * @param {Object} schema
 * @param {string} modelName
 * @param {string} relationName
 * @throws Error
 */
export function* hydrateRelationSchema( schema, modelName, relationName ) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	yield receiveRelationSchemaAndResolve(
		modelName,
		relationName,
		schema
	);
}

/**
 * A resolver for retrieving the relation schema from the server for the given
 * modelName and relationName.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @throws Error
 */
export function* getRelationSchema( modelName, relationName ) {
	modelName = singularModelName( modelName );
	const schema = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getSchemaForModel',
		modelName
	);
	if ( schema === null ) {
		throw new Error( 'The ' + modelName + ' does not have a schema' );
	}
	relationName = singularModelName( relationName );
	const pluralRelationName = pluralModelName( relationName );
	// is there a schema for plural relation name?
	let typeSchema = schema.hasOwnProperty( 'schema' ) &&
		schema.schema.hasOwnProperty( 'properties' ) ?
		schema.schema.properties[ pluralRelationName ] :
		null;
	typeSchema = typeSchema === null &&
		! isUndefined( schema.schema.properties[ relationName ] ) ?
		schema.schema.properties[ relationName ] :
		typeSchema;
	if ( typeSchema === null ) {
		throw new Error(
			'There is no relation for ' + relationName + ' on the ' +
			'model ' + modelName
		);
	}
	yield receiveRelationSchema(
		modelName,
		relationName,
		typeSchema
	);
}
