/**
 * Internal imports
 */
import InvalidType from './invalid-type';

/**
 * InvalidSchema
 * Usage: throw new eejs.InvalidSchema('some message', [schema object])
 *
 * Typically this error is thrown when an object representing a model schema
 * (at a minimum) does not have a "properties" property).
 *
 * @param {string} msg
 * @param {mixed} schema Optional, the schema object which will be added to a
 * schema property.
 */
export default class InvalidModelEntity extends InvalidType {
	constructor( ...args ) {
		super( ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidModelEntity );
		}
		this.message = 'Invalid model entity instance provided.' + this.message;
		this.modelEntity = args[ 1 ] || {};
	}
}
