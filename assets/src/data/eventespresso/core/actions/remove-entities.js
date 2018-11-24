/**
 * Internal imports
 */
import { ACTION_TYPES } from './action-types';
const { types } = ACTION_TYPES.entities;

/**
 * Action creator for removing the entity from the state.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {{type: string, modelName: string, entityId: number}} An action
 * object.
 */
export function removeEntityById( modelName, entityId ) {
	return {
		type: types.REMOVE_ENTITY_BY_ID,
		modelName,
		entityId,
	};
}

/**
 * Action creator for queueing the deletion of entity on the server
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {{type: string, modelName: string, entityId: {number}}} An action
 * object
 */
export function removeDeleteEntityId( modelName, entityId ) {
	return {
		type: types.REMOVE_DELETE_ENTITY_ID,
		modelName,
		entityId,
	};
}

/**
 * Action creator for queuing the trashing of entity on the server
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {{type: string, modelName: string, entityId: number}} An action
 * object.
 */
export function removeTrashEntityId( modelName, entityId ) {
	return {
		type: types.REMOVE_TRASH_ENTITY_ID,
		modelName,
		entityId,
	};
}
