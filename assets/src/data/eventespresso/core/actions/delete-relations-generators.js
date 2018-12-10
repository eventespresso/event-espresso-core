/**
 * Internal Imports
 */
import { removeEntityById } from './remove-entities';
import {
	receiveDirtyRelationIndex,
	receiveDirtyRelationDeletion,
} from './receive-relations';
import {
	removeDirtyRelationIndex,
	removeDirtyRelationAddition,
	removeRelatedEntities,
} from './remove-relations';
/**
 * External imports
 */
import {
	singularModelName,
	pluralModelName,
} from '@eventespresso/model';

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
	relationEntityId,
) {
	yield removeDirtyRelationIndex(
		relationName,
		relationEntityId,
		modelName,
		entityId
	);
	yield removeDirtyRelationAddition(
		relationName,
		relationEntityId,
		modelName,
		entityId,
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
	const singularRelationName = singularModelName( relationName );
	const pluralRelationName = pluralModelName( relationName );
	yield removeEntityById( singularRelationName, relationEntityId );
	yield removeRelatedEntities(
		modelName,
		entityId,
		relationName,
		[ relationEntityId ],
	);
	yield removeDirtyRelationForAddition(
		modelName,
		entityId,
		relationName,
		relationEntityId,
	);
	yield receiveDirtyRelationIndex(
		pluralRelationName,
		relationEntityId,
		modelName,
		entityId,
		false
	);
	yield receiveDirtyRelationDeletion(
		pluralRelationName,
		relationEntityId,
		modelName,
		entityId
	);
}

export { removeDirtyRelationForAddition, removeRelationForEntity };
