/**
 * External dependencies
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { getMethodName } from '../base-model';
import { isResolving } from '../base-selectors';
import { REDUCER_KEY } from './constants';

/**
 * Creates selectors for each registered model name wrapping the generic source
 * selectors.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated selectors for each model.
 */
export const createEntitySelectors = ( source ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		const schemaMethodName = getMethodName( modelName, 'schema', 'get' );
		const factoryMethodName = getMethodName( modelName, 'factory', 'get' );
		selectors[ schemaMethodName ] = (
			state
		) => source.getSchemaForModel( state, modelName );
		selectors[ getMethodName( modelName, 'schema', 'isRequesting' ) ] =
			() => isResolving( REDUCER_KEY, schemaMethodName );
		selectors[ factoryMethodName ] = (
			state
		) => source.getFactoryForModel( state, modelName );
		selectors[ getMethodName( modelName, 'factory', 'isRequesting' ) ] =
			() => isResolving( REDUCER_KEY, factoryMethodName );
		return selectors;
	},
	{}
);

/**
 * Creates resolvers for each registered model name wrapping the generic source
 * resolvers.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated resolvers for each model.
 */
export const createEntityResolvers = ( source ) => MODEL_NAMES.reduce(
	( resolvers, modelName ) => {
		resolvers[ getMethodName( modelName, 'schema', 'get' ) ] = () =>
			source.getSchemaForModel( modelName );
		resolvers[ getMethodName( modelName, 'factory', 'get' ) ] = () =>
			source.getFactoryForModel( modelName );
		return resolvers;
	},
	{}
);
