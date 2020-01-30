/**
 * External import
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getMethodName } from '../../base-model';

/**
 * Dynamic creation of selectors for entities
 * @param {Object} selector selector object that dynamically created functions
 * will be mapped to.
 * @return {Object} The new selector objects for each model.
 */
export const createSelectors = ( selector ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName(
			modelName,
			'records',
			'get'
		) ] = (
			state
		) => selector.getEntityRecordsForModel( state, modelName );
		selectors[ getMethodName( modelName, '', 'get', true ) ] = (
			state
		) => selector.getEntitiesForModel( state, modelName );
		selectors[ getMethodName( modelName, 'byId', 'get' ) ] = (
			state,
			entityId
		) => selector.getEntityById( state, modelName, entityId );
		selectors[ getMethodName(
			modelName,
			'byIds',
			'get',
			true
		) ] = (
			state,
			entityIds,
		) => selector.getEntitiesByIds( state, modelName, entityIds );
		selectors[ getMethodName(
			modelName,
			'idsQueuedForTrash',
			'get'
		) ] = ( state ) => selector.getEntityIdsQueuedForTrash(
			state,
			modelName
		);
		selectors[ getMethodName(
			modelName,
			'idsQueuedForDelete',
			'get'
		) ] = ( state ) => selector.getEntityIdsQueuedForDelete(
			state,
			modelName
		);
		return selectors;
	},
	{}
);
