/**
 * Internal dependencies
 */
import { getMethodName } from '../base-entities';
import { MODEL_NAMES } from '../../model';

/**
 * This method creates selectors for each registered model name wrapping the
 * generic source selectors.
 *
 * @param {Object<function>} selector
 * @return {Object<function>} All the generated selectors.
 */
export const createEntitySelectors = ( selector ) => MODEL_NAMES.reduce(
	( selectors, modelName ) => {
		selectors[ getMethodName( modelName, 'records' ) ] = (
			state
		) => selector.getEntityRecordsForModel( state, modelName );
		selectors[ getMethodName( modelName, '', 'get', true ) ] = (
			state
		) => selector.getEntitiesForModel( state, modelName );
		selectors[ getMethodName( modelName, 'byId' ) ] = (
			state,
			entityId
		) => selector.getEntityById( state, modelName, entityId );
		selectors[ getMethodName( modelName, 'byIds', 'get', true ) ] = (
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
		) ] = ( state ) => selector.getEntityIdsQueuedforDelete(
			state,
			modelName
		);
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
		return selectors;
	},
	{}
);

export const createEntityResolvers = ( resolver ) => MODEL_NAMES.reduce(
	( resolvers, modelName ) => {
		resolvers[ getMethodName(
			modelName,
			'byId',
			'get'
		) ] = ( entityId ) => resolver.getEntityById( modelName, entityId );
		return resolvers;
	},
	{}
);

export const createEntityActions = ( action ) => MODEL_NAMES.reduce(
	( actions, modelName ) => {
		actions[ getMethodName(
			modelName,
			'',
			'create'
		) ] = ( entity ) => action.createEntity( modelName, entity );
		actions[ getMethodName(
			modelName,
			'relation',
			'create',
		) ] = ( entityId, relationName, relationEntity ) => action
			.createRelation(
				modelName,
				entityId,
				relationName,
				relationEntity,
			);
		actions[ getMethodName(
			modelName,
			'relations',
			'create',
		) ] = ( entityId, relationName, relationEntities ) => action.
			createRelations(
				modelName,
				entityId,
				relationName,
				relationEntities,
			);
		actions[ getMethodName(
			modelName,
			'byId',
			'delete'
		) ] = ( entityId ) => action.deleteEntityById( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'byId',
			'trash',
		) ] = ( entityId ) => action.trashEntityById( modelName, entityId );
		actions[ getMethodName(
			modelName,

		) ]
		return actions;
	},
	{}
);
