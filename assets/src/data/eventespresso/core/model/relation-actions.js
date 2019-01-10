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
		) ] = ( entityId, relationName, relationEntityId ) => action
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
		) ] = ( entityId, relationName, relationEntityId ) => action
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
		) ] = () => action.persistAddRelationsForModel( modelName );
		actions[ getMethodName(
			modelName,
			'',
			'persistDeleteRelationsFor'
		) ] = () => action.persistDeleteRelationsForModel( modelName );
		actions[ getMethodName(
			modelName,
			'',
			'persistRelationsFor'
		) ] = ( addRelation = true ) =>
			action.persistRelationsForModel( modelName, addRelation );
		actions[ getMethodName(
			modelName,
			'relationsForId',
			'persist'
		) ] = ( entityId, addRelation = true ) => action
			.persistRelationsForEntityId(
				modelName,
				entityId,
				addRelation
			);
		actions[ getMethodName(
			modelName,
			'relationsForIdAndRelation',
			'persist'
		) ] = ( entityId, relationName, addRelation = true ) => action
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
		) ] = (
			entityId,
			relationName,
			relationId,
			addRelation = true
		) => action
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
		) ] = (
			entityId,
			relationName,
			relationId,
			addRelation = true
		) => action
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
		) ] = ( entityId, relationName, relationEntityIds ) => action
			.receiveRelatedEntities(
				modelName,
				entityId,
				relationName,
				relationEntityIds
			);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveDirtyRelationAdditionFor'
		) ] = ( relationName, relationId, entityId ) => action
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
		) ] = ( relationName, relationId, entityId ) => action
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
		) ] = ( oldId, newId ) => action
			.receiveUpdatedEntityIdForRelations(
				modelName,
				oldId,
				newId
			);
		actions[ getMethodName(
			modelName,
			'id',
			'removeAllRelatedEntitiesFor'
		) ] = ( entityId ) => action.removeAllRelatedEntitiesForModelEntity(
			modelName,
			entityId
		);
		actions[ getMethodName(
			modelName,
			'idAndRelation',
			'removeRelatedEntitiesFor'
		) ] = ( entityId, relationName, relationIds ) => action
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
			addRelation = true,
		) => action.removeDirtyRelationIndex(
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
		) => action.removeDirtyRelationAddition(
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
		) => action.removeDirtyRelationDeletion(
			relationName,
			relationEntityId,
			modelName,
			entityId,
		);
		return actions;
	},
	{}
);
