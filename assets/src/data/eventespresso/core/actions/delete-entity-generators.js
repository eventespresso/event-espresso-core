/**
 * Internal Imports
 */
import { removeEntityById } from './remove-entities';
import {
	receiveTrashEntityId,
	receiveDeleteEntityId,
} from './receive-entities';
import { removeAllRelatedEntitiesForModelEntity } from './remove-relations';

/**
 * Action generator yielding actions for queuing an entity delete record
 * in the state.
 *
 * @param {string} modelName
 * @param {number} entityId
 */
export function* deleteEntityById( modelName, entityId ) {
	yield removeEntityById( modelName, entityId );
	// remove any relation records for this entity
	yield removeAllRelatedEntitiesForModelEntity( modelName, entityId );
	yield receiveDeleteEntityId( modelName, entityId );
}

/**
 * Action generator yielding actions for queueing an entity trash record in the
 * state.
 *
 * @param {string} modelName
 * @param {number} entityId
 */
export function* trashEntityById( modelName, entityId ) {
	yield removeEntityById( modelName, entityId );
	yield receiveTrashEntityId( modelName, entityId );
}
