/**
 * Internal Imports
 */
import InvalidArgument from './invalid-argument';

/**
 * InvalidIso8601String
 * Usage: throw new eejs.InvalidISO8601String('some message', [dateTimeString])
 *
 * Typically this error is thrown when a given string is not the correct format
 * for ISO 8601.
 *
 * @param {string} msg
 * @param {mixed} dateTimeString Optional, the timezone string that is invalid
 */
export default class InvalidISO8601String extends InvalidArgument {
	constructor( dateTimeString, message = '', ...args ) {
		message = message ?
			'The string provided is not a valid ISO 8601 formatted string. ' +
				message :
			'The string provided is not a valid ISO 8601 formatted string.';
		super( message, dateTimeString, ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidISO8601String );
		}
		this.dateTimeString = dateTimeString || '';
	}
}
