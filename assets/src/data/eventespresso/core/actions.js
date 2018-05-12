/**
 * Returns an action object used to update the store with the provided entities.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {{type: string, modelName: string, dirty: boolean, entities: Array}}
 *            Object for action
 */
export function receiveEntityRecords( modelName, entities = [] ) {
	return {
		type: 'RECEIVE_ENTITY_RECORDS',
		modelName,
		entities,
	};
}

/**
 * Returns an action object used to update the entity with the given id in the
 * store so that it is considered "clean" not dirty (sets dirty flag to false).
 * Typically, this will get used by save/persist to server actions.
 *
 * @param { string } modelName
 * @param { number } entityId
 * @return {{type: string, modelName: *, entityId: *}}
 * 			Object for action.
 */
export function cleanEntityById( modelName, entityId ) {
	return {
		type: 'CLEAN_ENTITY',
		modelName,
		entityId,
	};
}

/**
 * Returns an action object used to update the given entities in the store so
 * that they are considered "clean" not dirty (sets dirty flag to false).
 * Typically, this will get used by save/persist to server actions.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {{type: string, modelName: *, entities: Array}}
 * 			Object for action.
 */
export function cleanEntities( modelName, entities = [] ) {
	return {
		type: 'CLEAN_ENTITIES',
		modelName,
		entities,
	};
}