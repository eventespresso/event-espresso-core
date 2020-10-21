/**
 * External imports
 */
import { getEndpoint, singularModelName } from '@eventespresso/model';
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';

/**
 * Internal Imports
 */
import { fetch, resolveSelect } from '../../base-controls';
import { receiveEntityRecords } from './../actions';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';
import { appendCalculatedFieldsToPath } from './utils';

/**
 * A resolver for getting an entity for the given model name and entity id.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {Array} calculatedFields
 * @return {null|BaseEntity} If successfully retrieved, the entity,
 * otherwise null.
 */
export function* getEntityById(modelName, entityId, calculatedFields = []) {
	modelName = singularModelName(modelName);
	let path = `${getEndpoint(modelName)}/${entityId}`;
	path = appendCalculatedFieldsToPath(path, calculatedFields);
	const entity = yield fetch({ path });
	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		modelName
	);
	if (!isModelEntityFactoryOfModel(factory, modelName)) {
		return null;
	}
	const fullEntity = factory.fromExisting(entity);
	yield receiveEntityRecords(modelName, [fullEntity]);
	return fullEntity;
}
