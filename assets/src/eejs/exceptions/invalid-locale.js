/**
 * Internal imports
 */
import InvalidArgument from './invalid-argument';

/**
 * InvalidLocale
 * Usage: throw new eejs.InvalidLocale('some message', [locale])
 *
 * Typically this error is thrown when a given string is not a valid locale
 * string.
 *
 * @param {string} msg
 * @param {mixed} locale Optional, the locale string that is invalid
 */
export default class InvalidLocale extends InvalidArgument {
	constructor( locale, message = '', ...args ) {
		message = message ?
			'The locale string provided is not valid. ' + message :
			'The locale string provided is not valid.';
		super( message, locale, ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidLocale );
		}
		this.locale = locale || '';
	}
}
