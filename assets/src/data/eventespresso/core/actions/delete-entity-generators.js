/**
 * Internal Imports
 */
import { removeEntityById } from './remove';
import {
	receiveTrashEntityId,
	receiveDeleteEntityId,
} from './receive';

/**
 * Action generator yielding actions for queuing an entity delete record
 * in the state.
 *
 * @param {string} modelName
 * @param {number} entityId
 */
export function* deleteEntityById( modelName, entityId ) {
	yield removeEntityById( modelName, entityId );
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
