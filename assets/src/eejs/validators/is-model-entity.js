/**
 * External imports
 */
import { isObject, camelCase, upperFirst } from 'lodash';
/**
 * Returns whether the given value is a model entity.
 *
 * @param {Object} entity
 * @return {boolean} True means it is a model entity.
 */
export const isModelEntity = ( entity ) => {
	return (
		isObject( entity ) &&
		Object.getPrototypeOf( entity.constructor ).name === 'BaseEntity'
	);
};

/**
 * Returns whether the given value is a model entity for the given model type.
 *
 * @param {Object} entity
 * @param {string} modelName
 * @return {boolean} True means it is a model entity for the given model.
 */
export const isModelEntityOfModel = ( entity, modelName ) => {
	modelName = upperFirst( camelCase( modelName ) );
	return (
		isModelEntity( entity ) &&
		entity.constructor.name === modelName
	);
};
