/**
 * External imports
 */
import moment from 'moment-timezone';
import { ServerDateTime } from '@eventespresso/value-objects';

/**
 * attempts to create a ServerDateTime object from the provided value
 *
 * @function
 * @param {Date|moment|number|ServerDateTime|string} newDateValue
 * @return {ServerDateTime} valid date object
 */
const getServerDateTime = ( newDateValue ) => {
	if ( newDateValue instanceof ServerDateTime ) {
		return newDateValue;
	}
	if ( newDateValue instanceof Date ) {
		return ServerDateTime.fromJSDate( newDateValue );
	}
	if ( typeof newDateValue === 'string' ) {
		const newDate = new Date( newDateValue );
		if ( newDate instanceof Date ) {
			return ServerDateTime.fromJSDate( newDate );
		}
	}
	const newDateValueInt = parseInt( newDateValue, 10 );
	if ( newDateValueInt ) {
		return ServerDateTime.fromUnix( newDateValue );
	}
	if ( moment.isMoment( newDateValue ) ) {
		return ServerDateTime.fromMoment( newDateValue );
	}
	throw new TypeError(
		'Could not create a ServerDateTime object because an invalid' +
		' value was supplied to getServerDateTime'
	);
};

export default getServerDateTime;
