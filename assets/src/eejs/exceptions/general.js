/**
 * General EE Exception
 * Usage: throw new eejs.Exception('some message')
 * @param {string} msg
 */
export default class Exception extends Error {
	constructor( message ) {
		super( message );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, Exception );
		}
	}
}
