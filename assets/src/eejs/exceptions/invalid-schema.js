/**
 * InvalidSchema
 * Usage: throw new eejs.Exception('some message')
 * @param {string} msg
 */
export default class InvalidSchema extends TypeError {
	constructor( ...args ) {
		super( ...args );
		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, InvalidSchema );
		}
		this.message = 'Invalid schema object provided. Must have a' +
			' "properties" property.' + this.message;
		this.schema = args[ 1 ] || {};
	}
}
