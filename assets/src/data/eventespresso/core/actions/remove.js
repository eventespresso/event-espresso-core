/**
 * Removes the entity from state (but does not persist that removal).
 * @param modelName
 * @param entityId
 * @return {{type: string, modelName: *, entityId: *}}
 */
export function removeEntityById( modelName, entityId ) {
	return {
		type: 'REMOVE_ENTITY_BY_ID',
		modelName,
		entityId,
	};
}

export function removeDeleteEntityId( modelName, entityId ) {
	return {
		type: 'REMOVE_DELETE_ENTITY_ID',
		modelName,
		entityId,
	};
}

export function removeTrashEntityId( modelName, entityId ) {
	return {
		type: 'REMOVE_TRASH_ENTITY_ID',
		modelName,
		entityId,
	};
}
