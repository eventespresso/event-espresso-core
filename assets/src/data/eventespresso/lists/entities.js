/**
 * Internal dependencies
 */
import { getMethodName } from '../base-entities';
import { MODEL_NAMES } from '../../model';

/**
 * This method creates selectors for each registered model name wrapping the
 * generic source selectors.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated selectors for each model.
 */
export const createEntitySelectors = ( source ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName( modelName, '', 'get', true ) ] = (
			state,
			queryString,
		) => source.getEntities( state, modelName, queryString );
		selectors[ getMethodName( modelName, '', 'isRequesting', true ) ] = (
			state,
			queryString,
		) => source.isRequestingEntities( state, modelName, queryString );
		return selectors;
	},
	{},
);

/**
 * This method creates resolvers for each registered model name wrapping the
 * generic source resolvers.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated resolvers for each model.
 */
export const createEntityResolvers = ( source ) => MODEL_NAMES.reduce(
	( resolvers, modelName ) => {
		resolvers[ getMethodName( modelName, '', 'get', true ) ] = (
			queryString
		) => source.getEntities( modelName, queryString );
		return resolvers;
	},
	{},
);
