/**
 * External dependencies
 */
import { isResolving, hasFinishedResolving } from '../base-selectors';
import { REDUCER_KEY } from './constants';

/**
 * Selector for returning the schema object for a given model name from the
 * state.
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns the schema object or null if it doesn't exist.
 */
export function getSchemaForModel( state, modelName ) {
	return state.schema && state.schema[ modelName ] ?
		state.schema[ modelName ] :
		{};
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
	const value = isResolving( REDUCER_KEY, 'getSchemaForModel', modelName );
	return value;
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
	return hasFinishedResolving( REDUCER_KEY, 'getSchemaForModel', modelName );
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
	return state.factory && state.factory[ modelName ] ?
		state.factory[ modelName ] :
		{};
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
	return isResolving( REDUCER_KEY, 'getFactoryForModel', modelName );
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
	return hasFinishedResolving( REDUCER_KEY, 'getFactoryForModel', modelName );
}
