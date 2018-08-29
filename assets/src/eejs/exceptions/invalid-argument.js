/**
 * InvalidArgument
 * Usage: throw new eejs.InvalidArgument('some message'[, argument])
 *
 * Typically this error is thrown when a function or method is called with an
 * invalid argument for a given parameter.  It could still be the right type
 * but its an unexpected value.
 *
 * @param {string} message
 * @param {mixed} argumentValue Optional, the argument that caused the error.
 * @param {...mixed} args
 * @return {InvalidArgument} instance of InvalidArgument
 */
function InvalidArgument( message, argumentValue, ...args ) {
	const instance = new Error( message, ...args );
	Object.setPrototypeOf( instance, Object.getPrototypeOf( this ) );
	instance.argumentValue = argumentValue || null;
	instance.name = instance.constructor.name;
	instance.message = instance.message !== '' ?
		'Invalid argument provided. ' + instance.message :
		'Invalid argument provided.';
	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( instance, InvalidArgument );
	}
	return instance;
}

InvalidArgument.prototype = Object.create( Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true,
	},
} );

if ( Object.setPrototypeOf ) {
	Object.setPrototypeOf( InvalidArgument, Error );
} else {
	InvalidArgument.__proto__ = Error;
}

export default InvalidArgument;
