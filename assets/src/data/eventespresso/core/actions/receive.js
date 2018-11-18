/**
 * Action for receiving entity records.
 * Entity records received will NOT replace any existing entities in the state
 * (matching ids).
 *
 * @param {string} modelName expected to be an model name.
 * @param {Object<number|string,Object>} entities Array of model entity
 * instances indexed by the primary key.
 * @return {
 * {
 * 	type: string,
 * 	modelName: string,
 * 	entities: Object<number|string,Object>
 * 	}
 * }  An action object.
 */
export function receiveEntityRecords( modelName, entities = {} ) {
	return {
		type: 'RECEIVE_ENTITY_RECORDS',
		modelName,
		entities,
	};
}

/**
 * Same as receiveEntityRecords except incoming entities will replace any
 * matching records (by ID)  in the state.
 * @param {string} modelName
 * @param {Object<number|string,Object>} entities
 * @return {
 * {
 * 	type: string,
 * 	modelName: string,
 * 	entities: Object<number|string,Object>
 * 	}
 * }  An action object.
 */
export function receiveAndReplaceEntityRecords( modelName, entities = {} ) {
	return {
		type: 'RECEIVE_AND_REPLACE_ENTITY_RECORDS',
		modelName,
		entities,
	};
}

export function receiveEntity( modelName, entity ) {
	return {
		type: 'RECEIVE_ENTITY',
		modelName,
		entity,
	};
}

export function receiveRelatedEntities( modelName, entityId, relatedEntityIds ) {
	return {
		type: 'RECEIVE_RELATED_ENTITY_IDS',
		modelName,
		entityId,
		relatedEntityIds,
	};
}

export function receiveTrashEntityId( modelName, entityId ) {
	return {
		type: 'RECEIVE_TRASH_ENTITY_ID',
		modelName,
		entityId,
	};
}

export function receiveDeleteEntityId( modelName, entityId ) {
	return {
		type: 'RECEIVE_DELETE_ENTITY_ID',
		modelName,
		entityId,
	};
}
