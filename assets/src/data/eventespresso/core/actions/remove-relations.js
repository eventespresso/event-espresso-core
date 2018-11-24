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
const { types } = ACTION_TYPES.relations;

/**
 * Action creator for removing relations from the given model from the relations
 * state.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {Array} relationEntityIds
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
export function removeRelatedEntities(
	modelName,
	entityId,
	relationName,
	relationEntityIds,
) {
	return {
		type: types.REMOVE_RELATED_ENTITY_IDS,
		modelName,
		entityId,
		relationName,
		relationEntityIds,
	};
}

/**
 * Action creator for removing the described relation from the relation index
 * state.
 *
 * @param {string} relationName
 * @param {number} relationEntityId
 * @param {string} modelName
 * @param {number} entityId
 * @param {boolean} addRelation
 * @return {
 * 	{
 * 		type: string,
 * 		relationName: string,
 * 		relationEntityId: number,
 * 		modelName: string,
 * 		entityId: number,
 * 		queueType: string
 * 	}
 * } An action object.
 */
export function removeDirtyRelationIndex(
	relationName,
	relationEntityId,
	modelName,
	entityId,
	addRelation = true
) {
	return {
		type: types.REMOVE_DIRTY_RELATION_INDEX,
		relationName,
		relationEntityId,
		modelName,
		entityId,
		queueType: addRelation ?
			TYPE_QUEUE_RELATION_ADD :
			TYPE_QUEUE_RELATION_DELETE,
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
export function removeDirtyRelationForType(
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
export function removeDirtyRelationAddition(
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
export function removeDirtyRelationDeletion(
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
