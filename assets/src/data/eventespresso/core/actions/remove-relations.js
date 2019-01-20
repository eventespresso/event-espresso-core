/**
 * Internal imports
 */
/**
 * Internal imports
 */
import {
	TYPE_QUEUE_RELATION_ADD,
	TYPE_QUEUE_RELATION_DELETE,
} from '../constants';
import { ACTION_TYPES } from './action-types';
const { relations: types } = ACTION_TYPES;

/**
 * Action creator for removing all indexed relations for a specific entity from
 * the state.
 *
 * Note: The following things are accomplished by this action (via the reducer):
 * - The relation index for the relation on this entity is removed from state.
 * - If the relation entities themselves have no other relation index, they
 *   are also removed from state.
 * - Any dirty relations for this entity are removed from state.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {{type: string, modelName: string, entityId: number}}
 * An action object
 */
function removeAllRelatedEntitiesForModelEntity( modelName, entityId ) {
	return {
		type: types.REMOVE_RELATED_ENTITIES_FOR_ENTITY,
		modelName,
		entityId,
	};
}

/**
 * Action creator for removing relations from the given model from the relations
 * state.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {Array} relatedEntityIds
 * @return {
 * 	{
 * 		type: string,
 * 		modelName: string,
 * 		entityId: number,
 * 		relationName: string,
 * 		relationEntityIds: Array
 * 	}
 * } An action object.
 */
function removeRelatedEntities(
	modelName,
	entityId,
	relationName,
	relatedEntityIds,
) {
	return {
		type: types.REMOVE_RELATED_ENTITY_IDS,
		modelName,
		entityId,
		relationName,
		relatedEntityIds,
	};
}

/**
 * Action creator for removing the dirty relation from the state for the given
 * relation action type (delete or add).
 *
 * @param {string} relationName
 * @param {number} relationEntityId
 * @param {string} modelName
 * @param {number} entityId
 * @param {boolean} addRelation
 * @return {
 * 	{
 * 		relationName: string,
 * 		relationEntityId: number,
 * 		modelName: string,
 * 		entityId: number,
 * 		type: string,
 * 		queueType: string
 * 	}
 * } An action object
 */
function removeDirtyRelationForType(
	relationName,
	relationEntityId,
	modelName,
	entityId,
	addRelation = true
) {
	const type = addRelation ? types.REMOVE_DIRTY_RELATION_ADDITION :
		types.REMOVE_DIRTY_RELATION_DELETION;
	return {
		relationName,
		relationEntityId,
		modelName,
		entityId,
		type,
		queueType: addRelation ?
			TYPE_QUEUE_RELATION_ADD :
			TYPE_QUEUE_RELATION_DELETE,
	};
}

/**
 * Action creator for removing the dirty relation from the add relation state
 * record.
 *
 * @param {string} relationName
 * @param {number} relationEntityId
 * @param {string} modelName
 * @param {number} entityId
 * @return {
 * 	{
 * 		relationName: string,
 * 		relationEntityId: number,
 * 		modelName: string,
 * 		entityId: number,
 * 		type: string,
 * 		queueType: string
 * 	}
 * } An action object.
 */
function removeDirtyRelationAddition(
	relationName,
	relationEntityId,
	modelName,
	entityId,
) {
	return removeDirtyRelationForType(
		relationName,
		relationEntityId,
		modelName,
		entityId,
	);
}

/**
 * An action creator for removing the dirty relation from the delete relation
 * state record.
 *
 * @param {string} relationName
 * @param {number} relationEntityId
 * @param {string} modelName
 * @param {number} entityId
 * @return {
 * 	{
 * 		relationName: string,
 * 		relationEntityId: number,
 * 		modelName: string,
 * 		entityId: number,
 * 		type: string,
 * 		queueType: string
 * 	}
 * } An action object
 */
function removeDirtyRelationDeletion(
	relationName,
	relationEntityId,
	modelName,
	entityId,
) {
	return removeDirtyRelationForType(
		relationName,
		relationEntityId,
		modelName,
		entityId,
		false,
	);
}

export {
	removeAllRelatedEntitiesForModelEntity,
	removeRelatedEntities,
	removeDirtyRelationAddition,
	removeDirtyRelationDeletion,
	removeDirtyRelationForType,
};
