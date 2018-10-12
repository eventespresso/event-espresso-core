/**
 * Action for receiving entity records.
 * Entity records received will NOT replace any existing entities in the state
 * (matching ids).
 *
 * @param {Object} factory expected to be an model entity factory.
 * @param {Object<number|string,Object>} entities Array of entities from a rest
 * response.
 * @return {
 * {
 * 	type: string,
 * 	factory: Object,
 * 	entities: Object<number|string,Object>
 * 	}
 * }  An action object.
 */
export function receiveEntityRecords( factory, entities = {} ) {
	return {
		type: 'RECEIVE_ENTITY_RECORDS',
		factory,
		entities,
	};
}

/**
 * Same as receiveEntityRecords except incoming entities will replace any
 * matching records (by ID)  in the state.
 * @param {Object} factory
 * @param {Object<number|string,Object>} entities
 * @return {
 * {
 * 	type: string,
 * 	factory: Object,
 * 	entities: Object<number|string,Object>
 * 	}
 * }  An action object.
 */
export function receiveAndReplaceEntityRecords( factory, entities = {} ) {
	return {
		type: 'RECEIVE_AND_REPLACE_ENTITY_RECORDS',
		factory,
		entities,
	};
}
