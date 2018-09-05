/**
 * Internal imports
 */
import InvalidArgument from './invalid-argument';

/**
 * InvalidTimezone
 * Usage: throw new eejs.InvalidTimezone('some message', [timezone])
 *
 * Typically this error is thrown when a given string is not a valid timezone
 * string.
 *
 * @param {string} msg
 * @param {mixed} timezone Optional, the timezone string that is invalid
 */
export default class InvalidTimezone extends InvalidArgument {
	constructor( timezone, message = '', ...args ) {
		message = message ?
			'The timezone string provided is not valid. ' + message :
			'The timezone string provided is not valid.';
		super( message, timezone, ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidTimezone );
		}
		this.timezone = timezone || '';
	}
}
