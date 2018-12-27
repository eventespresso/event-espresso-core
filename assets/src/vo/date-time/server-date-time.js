/**
 * Internal Imports.
 */
import DateTime from './datetime';
import {
	DEFAULT_TIMEZONE_STRING,
	HAS_TIMEZONE_STRING,
	DEFAULT_OFFSET,
	DEFAULT_VALID_LOCALE,
} from './defaults';

/**
 * External Imports.
 */
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';

/**
 * Inheriting the DateTime Value object, this represents a single point in time
 * within the context of the timezone or offset the server is set at.
 *
 * Instantiating this instead of `DateTime` removes the need to pass along
 * timezone string or offset and instantiates according to what has been set as
 * the defaults for those from the server.  Usage of this class is preferred
 * over DateTime to remove the need for client code to figure out if the server
 * has a timezone string set or is using a UTC offset.
 */
export default class ServerDateTime extends DateTime {
	/**
	 * The constructor for the ServerDateTime class
	 *
	 * @param {string} iso8601DateString
	 * @param {string} locale
	 */
	constructor(
		iso8601DateString = '',
		locale = DEFAULT_VALID_LOCALE
	) {
		if ( HAS_TIMEZONE_STRING ) {
			super( iso8601DateString, DEFAULT_TIMEZONE_STRING, locale );
		} else {
			const datetime = isEmpty( iso8601DateString ) ?
				moment().utcOffset( DEFAULT_OFFSET, true ).locale( locale ) :
				moment( iso8601DateString )
					.utcOffset( DEFAULT_OFFSET, true )
					.locale( locale );
			super( datetime.toISOString( true ), null, locale );
		}
	}

	/**
	 * Instantiate ServerDateTime from an ISO string.
	 * This overrides `DateTime.fromISO` removing the need to worry about
	 * whether to use `timezone` or `offset`.  This will simply use whatever is
	 * provided by the server (preferring timezone if its available).
	 *
	 * @param {string} ISOString
	 * @param {string} locale
	 * @return {ServerDateTime} An instance of ServerDateTime
	 */
	static fromISO( ISOString, locale = DEFAULT_VALID_LOCALE ) {
		return HAS_TIMEZONE_STRING ?
			new ServerDateTime(
				super
					.fromISO( ISOString, DEFAULT_TIMEZONE_STRING )
					.toISO(),
				locale
			) :
			new ServerDateTime(
				super
					.fromISOWithOffset( ISOString, DEFAULT_OFFSET )
					.toISO(),
				locale
			);
	}

	/**
	 * Instantiate ServerDateTime from an ISO string.
	 * This overrides `DateTime.fromJSDate` removing the need to worry about
	 * whether to use `timezone` or `offset`.  This will simply use whatever is
	 * provided by the server (preferring timezone if its available).
	 *
	 * @param {Date} date
	 * @param {string} locale
	 * @return {ServerDateTime} An instance of ServerDateTime
	 */
	static fromJSDate( date, locale = DEFAULT_VALID_LOCALE ) {
		return HAS_TIMEZONE_STRING ?
			new ServerDateTime(
				super
					.fromJSDate( date, DEFAULT_TIMEZONE_STRING )
					.toISO(),
				locale
			) :
			new ServerDateTime(
				super
					.fromJSDateWithOffset( date, DEFAULT_OFFSET )
					.toISO(),
				locale
			);
	}
}
