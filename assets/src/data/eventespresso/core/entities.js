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
 * @return {Object<function>} All the generated selectors.
 */
export const createEntitySelectors = ( source ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName( modelName, 'records' ) ] = (
			state
		) => source.getEntityRecordsForModel( state, modelName );
		selectors[ getMethodName( modelName, '', 'get', true ) ] = (
			state
		) => source.getEntitiesForModel( state, modelName );
		selectors[ getMethodName( modelName, 'byId' ) ] = (
			state,
			entityId
		) => source.getEntityById( state, modelName, entityId );
		selectors[ getMethodName( modelName, 'byIds', 'get', true ) ] = (
			state,
			entityIds,
		) => source.getEntitiesByIds( state, modelName, entityIds );
		return selectors;
	},
	{}
);

