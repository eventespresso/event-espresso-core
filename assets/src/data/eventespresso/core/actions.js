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
 * Returns an action object used to update the dirty state for the provided
 * entities.
 *
 * @param { string } modelName
 * @param { boolean } dirty
 * @param { Array } entities
 * @return {{type: string, modelName: string, dirty: boolean, entities: Array}}
 *            Object for action
 */
export function setEntitiesDirty( modelName, dirty = true, entities = [] ) {
	return {
		type: 'SET_DIRTY',
		modelName,
		dirty,
		entities,
	};
}

/**
 * Returns an action object used to update the dirty state for a single
 * provided entity.
 *
 * @param { string } modelName
 * @param { boolean } dirty
 * @param { Object } entity
 * @return {{type: string, modelName: string, dirty: boolean, entities: Array}}
 *            Object for action
 */
export function setEntityDirty( modelName, dirty = true, entity = {} ) {
	return {
		type: 'SET_DIRTY',
		modelName,
		dirty,
		entity,
	};
}

/**
 * Returns an action object used to update the dirty state for the provided
 * entityId.
 *
 * @param { string } modelName
 * @param { boolean } dirty
 * @param { number|string } entityId
 * @return {{type: string, modelName: string, dirty: boolean, entityId: number|string}}
 *            Object for action
 */
export function setEntityDirtyById( modelName, dirty = true, entityId ) {
	return {
		type: 'SET_DIRTY',
		modelName,
		dirty,
		entityId,
	};
}