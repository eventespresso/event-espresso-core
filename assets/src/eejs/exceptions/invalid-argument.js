/**
 * InvalidArgument
 * Usage: throw new eejs.InvalidArgument('some message', [parameter, argument])
 *
 * Typically this error is thrown when a function or method is called with an
 * invalid argument for a given parameter.  It could still be the right type
 * but its an unexpected value.
 *
 * @param {string} msg
 * @param {string} parameter Optional, the name of the parameter.
 * @param {mixed} argument Optional, the argument that caused the error.
 */
export default class InvalidArgument extends Error {
	constructor( ...args ) {
		super( ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidArgument );
		}
		this.message = 'Invalid argument provided.' + this.message;
		this.parameter = args[ 1 ] || '';
		this.argument = args[ 2 ] || null;
	}
}
