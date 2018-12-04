/**
 * External import
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getMethodName } from '../../base-model';

/**
 * Dynamic creation of selectors for relations
 * @param {Object} selector selector object that dynamically created functions
 * will be mapped to.
 * @return {Object} The new selector objects for each model relation.
 */
export const createSelectors = ( selector ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName(
			modelName,
			'additionRelations',
			'getQueued'
		) ] = ( state ) => selector.getRelationAdditionsQueuedForModel(
			state,
			modelName
		);
		selectors[ getMethodName(
			modelName,
			'deleteRelations',
			'getQueued'
		) ] = ( state ) => selector.getRelationAdditionsQueuedForModel(
			state,
			modelName
		);
		selectors[ getMethodName(
			modelName,
			'',
			'countRelationModelsIndexedFor'
		) ] = ( state, entityId ) => selector
			.countRelationModelsIndexedForEntity(
				state,
				modelName,
				entityId
			);
		return selectors;
	},
	{}
);
