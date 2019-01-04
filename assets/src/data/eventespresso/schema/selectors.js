/**
 * Internal dependencies
 */
import { isResolving, hasFinishedResolving } from '../base-selectors';
import { REDUCER_KEY } from './constants';

/**
 * External imports
 */
import { pluralModelName, singularModelName } from '@eventespresso/model';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Selector for returning the schema object for a given model name from the
 * state.
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} The schema object or null if it doesn't exist.
 */
export function getSchemaForModel( state, modelName ) {
	return state.schema.get( singularModelName( modelName ), null );
}

/**
 * Selector for returning whether the schema is being requested or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means its being requested.
 */
export function isRequestingSchemaForModel( state, modelName ) {
	return isResolving(
		REDUCER_KEY,
		'getSchemaForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning whether the schema has been resolved or not for the
 * given model name.
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the schema has finished resolving for this
 * model name.
 */
export function hasResolvedSchemaForModel( state, modelName ) {
	return hasFinishedResolving(
		REDUCER_KEY,
		'getSchemaForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning the model entity factory object for a given
 * model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns the model entity factory or null if it doesn't
 * exist.
 */
export function getFactoryForModel( state, modelName ) {
	return state.factory.get( singularModelName( modelName ), null );
}

/**
 * Selector for returning whether the model entity factory is being requested
 * or not for the given model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means it is being requested.
 */
export function isRequestingFactoryForModel( state, modelName ) {
	return isResolving(
		REDUCER_KEY,
		'getFactoryForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning whether the factory has been resolved or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the factory has finished resolving for this
 * model name.
 */
export function hasResolvedFactoryForModel( state, modelName ) {
	return hasFinishedResolving(
		REDUCER_KEY,
		'getFactoryForModel',
		singularModelName( modelName )
	);
}

/**
 * Return the relation endpoint for the given model, entity id and relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {string} Returns the relation endpoint if available or an empty
 * string.
 */
export function getRelationEndpointForEntityId(
	state,
	modelName,
	entityId,
	relationModelName
) {
	modelName = singularModelName( modelName );
	relationModelName = pluralModelName( relationModelName );
	entityId = normalizeEntityId( entityId );
	return state.relationEndpoints.getIn(
		[ modelName, entityId, relationModelName ]
	) || '';
}

/**
 * Selector for returning whether the relation endpoint is being requested
 * or not for the given model name, entity id, and relation from the state.
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {boolean}  True means it is being requested.
 */
export function isRequestingRelationEndpointForEntityId(
	state,
	modelName,
	entityId,
	relationModelName
) {
	modelName = singularModelName( modelName );
	entityId = normalizeEntityId( entityId );
	relationModelName = pluralModelName( relationModelName );
	return isResolving(
		REDUCER_KEY,
		'getRelationEndpointForEntityId',
		modelName,
		entityId,
		relationModelName,
	);
}
