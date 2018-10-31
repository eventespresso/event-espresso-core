/**
 * External imports
 */
import { isPlainObject, isUndefined, lowerCase } from 'lodash';

/**
 * Returns whether the given value is a schema response object from a schema
 * request.
 *
 * @param {Object} response
 * @return {boolean} true if this is a schema response object.
 */
export const isSchemaResponse = ( response ) => {
	return (
		hasSchemaProperty( response ) &&
		isSchema( response.schema )
	);
};

/**
 * Returns whether the given value is a schema object.
 *
 * @param {Object} schema
 * @return {boolean} true if this is a schema object.
 */
export const isSchema = ( schema ) => {
	return (
		isPlainObject( schema ) &&
		! isUndefined( schema.$schema ) &&
		isPlainObject( schema.properties )
	);
};

/**
 * Returns whether the given value is a schema response object for the given
 * model name
 *
 * @param {Object} response
 * @param {string} modelName
 * @return {boolean}  True means this is a schema response object for the given
 * model name.
 */
export const isSchemaResponseOfModel = ( response, modelName ) => {
	return (
		hasSchemaProperty( response ) &&
		isSchemaOfModel( response.schema, modelName )
	);
};

/**
 * Returns whether the given value is a schema object for the given model name.
 *
 * @param {Object} schema
 * @param {string} modelName
 * @return {boolean} True means this is a schema object for the given model
 * name.
 */
export const isSchemaOfModel = ( schema, modelName ) => {
	return (
		isSchema( schema ) &&
		! isUndefined( schema.title ) &&
		lowerCase( modelName ) === lowerCase( schema.title )
	);
};

/**
 * Returns whether the given value is an object with a schema property
 *
 * @param {*} object
 * @return {boolean}  True if a plain object with a schema property
 */
const hasSchemaProperty = ( object ) => {
	return isPlainObject( object ) && ! isUndefined( object.schema );
};
