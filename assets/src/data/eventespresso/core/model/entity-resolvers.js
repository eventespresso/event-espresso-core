/**
 * External import
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getMethodName } from '../../base-model';

/**
 * Dynamic creation of resolvers for entities
 * @param {Object} resolver The resolver object that dynamically created
 * functions will be mapped to.
 * @return {Object} The new resolver object containing functions for each model.
 */
export const createResolvers = ( resolver ) => MODEL_NAMES.reduce(
	( resolvers, modelName ) => {
		resolvers[ getMethodName(
			modelName,
			'byId',
			'get'
		) ] = ( entityId ) => resolver.getEntityById( modelName, entityId, [] );
		return resolvers;
	},
	{}
);
