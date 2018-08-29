/**
 * InvalidArgument
 * Usage: throw new eejs.InvalidArgument('some message'[, argument])
 *
 * Typically this error is thrown when a function or method is called with an
 * invalid argument for a given parameter.  It could still be the right type
 * but its an unexpected value.
 *
 * @param {string} msg
 * @param {mixed} argument Optional, the argument that caused the error.
 */
export default class InvalidArgument extends Error {
	constructor( ...args ) {
		super( ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidArgument );
		}
		this.message = this.message !== '' ?
			'Invalid argument provided. ' + this.message :
			'Invalid argument provided.';
		this.argumentName = args[ 1 ] || null;
	}
}
