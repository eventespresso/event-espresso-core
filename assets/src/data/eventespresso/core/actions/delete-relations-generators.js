/**
 * Internal Imports
 */
import { receiveDirtyRelationDeletion } from './receive-relations';
import {
	removeDirtyRelationAddition,
	removeRelatedEntities,
} from './remove-relations';
/**
 * External imports
 */
import { singularModelName } from '@eventespresso/model';

/**
 * Action generator yielding actions for handling removing the queued relations
 * for addition in the state
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {number} relationEntityId
 */
function* removeDirtyRelationForAddition(
	modelName,
	entityId,
	relationName,
	relationEntityId
) {
	modelName = singularModelName(modelName);
	yield removeDirtyRelationAddition(
		relationName,
		relationEntityId,
		modelName,
		entityId
	);
}

/**
 * Action generator yielding actions for actions for queuing the removal of a
 * relation.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {number} relationEntityId
 */
function* removeRelationForEntity(
	modelName,
	entityId,
	relationName,
	relationEntityId
) {
	modelName = singularModelName(modelName);
	relationName = singularModelName(relationName);
	yield removeRelatedEntities(modelName, entityId, relationName, [
		relationEntityId,
	]);
	yield removeDirtyRelationAddition(
		modelName,
		entityId,
		relationName,
		relationEntityId
	);

	yield receiveDirtyRelationDeletion(
		relationName,
		relationEntityId,
		modelName,
		entityId
	);
}

export { removeDirtyRelationForAddition, removeRelationForEntity };
