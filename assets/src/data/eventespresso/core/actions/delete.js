/**
 * Internal Imports
 */
import { removeEntityById } from './remove';
import { receiveTrashEntityId, receiveDeleteEntityId } from './receive';

export function* deleteEntityById( modelName, entityId ) {
	yield removeEntityById( modelName, entityId );
	yield receiveDeleteEntityId( modelName, entityId );
}

export function* trashEntityById( modelName, entityId ) {
	yield removeEntityById( modelName, entityId );
	yield receiveTrashEntityId( modelName, entityId );
}
