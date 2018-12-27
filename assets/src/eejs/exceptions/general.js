/**
 * General EE Exception
 * Usage: throw new eejs.Exception('some message')
 * @param {string} message
 * @param {...mixed} args
 * @return {Exception} instance
 */
function Exception( message, ...args ) {
	const instance = new Error( message, ...args );
	Object.setPrototypeOf( instance, Object.getPrototypeOf( this ) );
	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( instance, Exception );
	}
	return instance;
}

Exception.prototype = Object.create( Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true,
	},
} );

if ( Object.setPrototypeOf ) {
	Object.setPrototypeOf( Exception, Error );
} else {
	Exception.__proto__ = Error;
}

export default Exception;
