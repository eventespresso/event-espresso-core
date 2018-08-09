/**
 * Returns an action object used to update the store with the provided schema
 * for the provided modelName.
 *
 * @param {string} modelName
 * @param {Object} schema
 * @return {{type: string, modelName: *, schema}}  The action object.
 */
export function receiveSchemaForModel( modelName, schema = {} ) {
	return {
		type: 'RECEIVE_SCHEMA_RECORD',
		modelName,
		schema,
	};
};