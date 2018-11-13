/**
 * Internal imports
 */
import InvalidType from './invalid-type';

/**
 * InvalidDateTime
 * Usage: throw new eejs.InvalidDateTime('some message', [datetime])
 *
 * Typically this error is thrown when a given string is not a valid datetime
 * string.
 *
 * @param {string} msg
 * @param {mixed} datetime Optional, the datetime string that is invalid
 */
export default class InvalidDateTime extends InvalidType {
	constructor( datetime, message, ...args ) {
		super( message, ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidDateTime );
		}
		this.message = 'The value provided is not a valid DateTime. ' +
			this.message;
		this.datetime = datetime || '';
		this.name = 'InvalidDateTime';
	}
}
