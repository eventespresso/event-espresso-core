/**
 * Internal dependencies
 */
import { getMethodName } from '../base-entities';
import { MODEL_NAMES } from '../../model';

/**
 * Creates selectors for each registered model name wrapping the generic source
 * selectors.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated selectors for each model.
 */
export const createEntitySelectors = ( source ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName( modelName, 'schema', 'get' ) ] = (
			state
		) => source.getSchemaForModel( state, modelName );
		selectors[ getMethodName( modelName, 'schema', 'isRequesting' ) ] = (
			state
		) => source.isRequestingSchemaForModel( state, modelName );
		selectors[ getMethodName( modelName, 'factory', 'get' ) ] = (
			state
		) => source.getFactoryForModel( state, modelName );
		selectors[ getMethodName( modelName, 'factory', 'isRequesting' ) ] = (
			state
		) => source.isRequestingFactoryForModel( state, modelName );
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
