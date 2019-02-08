/**
 * External imports
 */
import { isUndefined } from 'lodash';

/**
 * Utility for checking whether the given value represents a
 * ModelEntityFactory object.
 *
 * @param {Object} factory
 * @return {boolean} true means the object is a ModelEntityFactory
 */
export const isModelEntityFactory = ( factory ) => {
	return (
		!! factory &&
		! isUndefined( factory.classDef ) &&
		! isUndefined( factory.modelName ) &&
		Object.getPrototypeOf( factory.classDef ).name === 'BaseEntity'
	);
};

/**
 * Utility for checking whether the given value represents a ModelEntityFactory
 * for a specific model.
 *
 * Note: modelName is expected to be the lowercase, snakecase string for the
 * model.  Eg. 'event', or 'message_template'.
 *
 * @param {Object} factory
 * @param {string} modelName
 * @return {boolean} True means the given factory
 */
export const isModelEntityFactoryOfModel = ( factory, modelName ) => {
	return (
		isModelEntityFactory( factory ) &&
		factory.modelName === modelName
	);
};
