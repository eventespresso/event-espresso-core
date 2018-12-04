/**
 * External import
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getMethodName } from '../../base-model';

/**
 * Dynamic creation of actions for relations
 * @param {Object} action The action object that dynamically created functions
 * will be mapped to.
 * @return {Object} The new action object containing functions for each model
 * relation.
 */
export const createActions = ( action ) => MODEL_NAMES.reduce(
	( actions, modelName ) => {
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
		) ] = ( entityId, relationName, relationEntities ) => action
			.createRelations(
				modelName,
				entityId,
				relationName,
				relationEntities,
			);
		actions[ getMethodName(
			modelName,
			'relationForAddition',
			'removeDirty'
		) ] = ( entityId, relationName, relationEntityId ) => actions
			.removeDirtyRelationForAddition(
				modelName,
				entityId,
				relationName,
				relationEntityId,
			);
		actions[ getMethodName(
			modelName,
			'',
			'removeRelationFor'
		) ] = ( entityId, relationName, relationEntityId ) => actions
			.removeRelationForEntity(
				modelName,
				entityId,
				relationName,
				relationEntityId
			);
		actions[ getMethodName(
			modelName,
			'',
			'persistAddRelationsFor'
		) ] = () => actions.persistAddRelationsForModel( modelName );
		actions[ getMethodName(
			modelName,
			'',
			'persistDeleteRelationsFor'
		) ] = () => actions.persistDeleteRelationsForModel( modelName );
		actions[ getMethodName(
			modelName,
			'',
			'persistRelationsFor'
		) ] = ( addRelation ) =>
			actions.persistAddRelationsForModel( modelName, addRelation );
		actions[ getMethodName(
			modelName,
			'relationsForId',
			'persist'
		) ] = ( entityId, addRelation ) => actions
			.persistRelationsForEntityId(
				modelName,
				entityId,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'relationsForIdAndRelation',
			'persist'
		) ] = ( entityId, relationName, addRelation ) => actions
			.persistRelationsForEntityIdAndRelation(
				modelName,
				entityId,
				relationName,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'relationsForIdAndRelationId',
			'persist'
		) ] = ( entityId, relationName, relationId, addRelation ) => actions
			.persistRelationsForEntityIdAndRelationId(
				modelName,
				entityId,
				relationName,
				relationId,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'id',
			'removeDirtyRelationsFor'
		) ] = ( entityId, relationName, relationId, addRelation ) => actions
			.removeDirtyRelations(
				relationName,
				relationId,
				modelName,
				entityId,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveRelatedEntitiesFor'
		) ] = ( entityId, relationName, relationEntityIds ) => actions
			.receiveRelatedEntities(
				modelName,
				entityId,
				relationName,
				relationEntityIds
			);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveDirtyRelationIndexFor'
		) ] = ( relationName, relationId, entityId, addRelation ) => actions
			.receiveDirtyRelationIndex(
				relationName,
				relationId,
				modelName,
				entityId,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveDirtyRelationAdditionFor'
		) ] = ( relationName, relationId, entityId ) => actions
			.receiveDirtyRelationAddition(
				relationName,
				relationId,
				modelName,
				entityId
			);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveDirtyRelationDeletionFor'
		) ] = ( relationName, relationId, entityId ) => actions
			.receiveDirtyRelationDeletion(
				relationName,
				relationId,
				modelName,
				entityId
			);
		actions[ getMethodName(
			modelName,
			'relations',
			'receiveUpdatedEntityIdFor'
		) ] = ( oldId, newId ) => actions
			.receiveUpdatedEntityIdForRelations(
				modelName,
				oldId,
				newId
			);
		actions[ getMethodName(
			modelName,
			'id',
			'removeAllRelatedEntitiesFor'
		) ] = ( entityId ) => actions.removeAllRelatedEntitiesForModelEntity(
			modelName,
			entityId
		);
		actions[ getMethodName(
			modelName,
			'idAndRelation',
			'removeRelatedEntitiesFor'
		) ] = ( entityId, relationName, relationIds ) => actions
			.removeRelatedEntities(
				modelName,
				entityId,
				relationName,
				relationIds,
			);
		actions[ getMethodName(
			modelName,
			'idAndRelation',
			'removeDirtyRelationIndexFor'
		) ] = (
			relationName,
			relationEntityId,
			entityId,
			addRelation,
		) => actions.removeDirtyRelationIndex(
			relationName,
			relationEntityId,
			modelName,
			entityId,
			addRelation
		);
		actions[ getMethodName(
			modelName,
			'idAndRelation',
			'removeDirtyRelationAdditionFor'
		) ] = (
			relationName,
			relationEntityId,
			entityId,
		) => actions.removeDirtyRelationAddition(
			relationName,
			relationEntityId,
			modelName,
			entityId,
		);
		actions[ getMethodName(
			modelName,
			'idAndRelation',
			'removeDirtyRelationDeletionFor'
		) ] = (
			relationName,
			relationEntityId,
			entityId,
		) => actions.removeDirtyRelationDeletion(
			relationName,
			relationEntityId,
			modelName,
			entityId,
		);
		return actions;
	},
	{}
);
