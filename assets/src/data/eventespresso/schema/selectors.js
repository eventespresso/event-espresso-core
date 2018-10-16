/**
 * External dependencies
 */
import { isResolving } from '../base-selectors';
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
 * @param {string} modelName
 * @return {boolean}  True means its being requested.
 */
export function isRequestingSchemaForModel( modelName ) {
	return isResolving( REDUCER_KEY, 'getSchemaForModel', modelName );
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
 * @param {string} modelName
 * @return {boolean}  True means it is being requested.
 */
export function isRequestingFactoryForModel( modelName ) {
	return isResolving( REDUCER_KEY, 'getFactoryForModel', modelName );
}
