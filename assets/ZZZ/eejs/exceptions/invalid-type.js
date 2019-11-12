/**
 * InvalidType
 * Usage: throw new eejs.InvalidType('some message'[, argument])
 *
 * This is essentially a wrapper around the native `TypeError` error handler.
 * The purpose is to allow for more custom specific type errors to be created
 * using ES6 syntax since there are usually transpiling issues using ES6 syntax
 * extending native Errors.
 *
 * @param {string} message
 * @param {mixed} argumentValue Optional, the argument that caused the error.
 * @param {...mixed} args
 * @return {InvalidType} instance of InvalidType
 */
function InvalidType( message, argumentValue, ...args ) {
	const instance = new TypeError( message, ...args );
	Object.setPrototypeOf( instance, Object.getPrototypeOf( this ) );
	instance.argumentValue = argumentValue || null;
	instance.name = instance.constructor.name;
	instance.message = instance.message !== '' ?
		'Invalid type provided. ' + instance.message :
		'Invalid type provided.';
	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( instance, InvalidType );
	}
	return instance;
}

InvalidType.prototype = Object.create( TypeError.prototype, {
	constructor: {
		value: TypeError,
		enumerable: false,
		writable: true,
		configurable: true,
	},
} );

if ( Object.setPrototypeOf ) {
	Object.setPrototypeOf( InvalidType, TypeError );
} else {
	InvalidType.__proto__ = TypeError;
}

export default InvalidType;
