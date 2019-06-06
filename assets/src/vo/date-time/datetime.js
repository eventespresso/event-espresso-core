/**
 * External imports
 */
import moment from 'moment-timezone';
import {
	capitalize,
	omit,
	isNumber,
	isEmpty,
	reduce,
	isObject,
	isUndefined,
	isFunction,
} from 'lodash';
import { instanceOf } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	InvalidDateTime,
	InvalidArgument,
	InvalidISO8601String,
} from '@eventespresso/eejs';
import * as assertions from './assertions';
import Duration from './duration';
import {
	DEFAULT_TIMEZONE_STRING,
	DEFAULT_OFFSET,
	DEFAULT_VALID_LOCALE,
	DEFAULT_FORMAT,
} from './defaults';

/**
 * A collection of symbols used for "private" properties in the DateTime object.
 *
 * @type {
 * 	{
 * 		datetime: Symbol
 * 	}
 * }
 */
const privateProperties = {
	datetime: Symbol( 'DateTimePropertyDateTime' ),
};

/**
 * A collection of symbols used for "private" methods in the DateTime object.
 *
 * @type {
 * {
 * 	getUnitNames: Symbol,
 * 	createGettersAndSetters: Symbol,
 * 	extractMomentsFromDateTimes: Symbol,
 * 	normalizeUnitName: Symbol,
 * 	normalizeUnitObject: Symbol,
 * 	normalizeUnitValue: Symbol,
 * 	}
 * }
 */
const privateMethods = {
	getUnitNames: Symbol( 'DateTimeMethodGetUnitNames' ),
	createGettersAndSetters: Symbol( 'DateTimeMethodCreateGettersAndSetters' ),
	extractMomentsFromDateTimes: Symbol( 'DateTimeMethodExtractMomentsFromDateTimes' ),
	normalizeUnitName: Symbol( 'DateTimeMethodNormalizeUnitName' ),
	normalizeUnitObject: Symbol( 'DateTimeMethodNormalizeUnitObject' ),
	normalizeUnitValue: Symbol( 'DateTimeMethodNormalizeUnitValue' ),
};

const validDateTimeUnits = [
	'year',
	'month',
	'day',
	'hour',
	'minute',
	'second',
	'millisecond',
];

/**
 * The DateTime value object represents a single point in time.
 *
 * Internally, the DateTime class here uses `moment`.  This is an abstraction
 * loosely following the adapter pattern so that there is a common api that
 * can be depended on if in the future the internal library is switched to
 * something different (such as Luxon).
 */
export default class DateTime {
	/**
	 * The constructor for the DateTime class
	 *
	 * @param {string} iso8601DateString
	 * @param {string|null} timezone If null, then timezone is not set.
	 * @param {string} locale
	 */
	constructor(
		iso8601DateString = '',
		timezone = DEFAULT_TIMEZONE_STRING,
		locale = DEFAULT_VALID_LOCALE
	) {
		if ( iso8601DateString !== '' ) {
			DateTime.assertISO8601IsValid( iso8601DateString );
		}
		DateTime.assertLocaleIsValid( locale );
		if ( timezone === null ) {
			this[ privateProperties.datetime ] = iso8601DateString === '' ?
				moment.utc().locale( locale ) :
				moment( iso8601DateString )
					.utcOffset( iso8601DateString )
					.locale( locale );
		} else if ( timezone === DateTime.TIMEZONE_LOCAL ) {
			this[ privateProperties.datetime ] = iso8601DateString === '' ?
				moment().locale( locale ) :
				moment( iso8601DateString ).locale( locale );
		} else {
			DateTime.assertTimezoneIsValid( timezone );
			this[ privateProperties.datetime ] = iso8601DateString === '' ?
				moment().tz( timezone ).locale( locale ) :
				moment.tz(
					iso8601DateString,
					timezone
				).locale( locale );
		}
		this[ privateMethods.createGettersAndSetters ]();
		Object.freeze( this );
	}

	/**
	 * Indicates if the given locale is a valid locale.
	 * @param {string} locale
	 * @return {boolean} true means it is valid
	 */
	static validateLocale( locale ) {
		return assertions.validateLocale( locale );
	}

	/**
	 * Asserts if the given locale is valid and throws an error if not.
	 * @param {string} locale
	 * @throws InvalidLocale
	 */
	static assertLocaleIsValid( locale ) {
		assertions.assertLocaleIsValid( locale );
	}

	/**
	 * Indicates if the given ISO8601 string is valid.
	 * @param {string} dateTimeString
	 * @return {boolean} true means it is valid.
	 */
	static validateISO8601( dateTimeString ) {
		return assertions.validateISO8601( dateTimeString );
	}

	/**
	 * Asserts if the given string is a valid ISO 8601 string.
	 * @param {string} dateTimeString
	 * @throws InvalidISO8601String
	 */
	static assertISO8601IsValid( dateTimeString ) {
		assertions.assertISO8601IsValid( dateTimeString );
	}

	/**
	 * Indicates if the given string is a valid timezone
	 * @param {string} timezone
	 * @return {boolean} true means it is valid.
	 */
	static validateTimezone( timezone ) {
		return assertions.validateTimezone( timezone );
	}

	/**
	 * Asserts whether the given string is a valid timezone string.
	 * @param {string} timezone
	 * @throws InvalidTimezone
	 */
	static assertTimezoneIsValid( timezone ) {
		assertions.assertTimezoneIsValid( timezone );
	}

	/**
	 * Validates whether the provided value is a valid offset
	 *
	 * Currently this just validates the provided value is a number. Eventually it
	 * might check upper and lower limits.
	 *
	 * @param {number} offset
	 * @return {boolean}  true means its valid.
	 */
	static validateIsOffset( offset ) {
		return assertions.validateIsOffset( offset );
	}

	/**
	 * Asserts whether the provided value is a valid offset.
	 *
	 * @param {number} offset
	 * @throws TypeError
	 */
	static assertIsOffset( offset ) {
		assertions.assertIsOffset( offset );
	}

	/**
	 * Indicates whether the provided value is an instance of DateTime
	 * @param {DateTime} datetime
	 * @return {boolean} returns true if it is an instance of DateTime
	 */
	static validateIsDateTime( datetime ) {
		return instanceOf( datetime, 'DateTime' ) ||
			instanceOf( datetime, 'ServerDateTime' );
	}

	/**
	 * Asserts whether the provided value is an instance of DateTime
	 * @param {DateTime} datetime
	 * @throws TypeError
	 */
	static assertIsDateTime( datetime ) {
		if ( ! DateTime.validateIsDateTime( datetime ) ) {
			throw new TypeError(
				'The provided value is not an instance of DateTime'
			);
		}
	}

	/**
	 * Validates whether the given value is an instance of the javascript Date
	 * object.
	 *
	 * @param {Date} date
	 * @return {boolean} True means the value is an instance of Date
	 */
	static validateIsDate( date ) {
		return assertions.validateIsDate( date );
	}

	/**
	 * Asserts whether the given value is an instance of Date.
	 * @param {Date} date
	 * @throws TypeError
	 */
	static assertIsDate( date ) {
		assertions.assertIsDate( date );
	}

	/**
	 * Indicates whether the provided value is an instance of DateTime and is
	 * a "valid" datetime (meaning the instance was constructed with valid
	 * arguments).
	 * @param {DateTime} datetime
	 * @return {boolean} true means it is valid.
	 */
	static isValid( datetime ) {
		return DateTime.validateIsDateTime( datetime ) && datetime.isValid();
	}

	/**
	 * Asserts whether the provided value is an instance of DateTime and is
	 * a "valid" datetime (meaning the instance was constructed with valid
	 * arguments)
	 * @param {DateTime} datetime
	 * @throws InvalidDateTime
	 */
	static assertIsValid( datetime ) {
		if ( ! DateTime.isValid( datetime ) ) {
			throw new InvalidDateTime( datetime );
		}
	}

	/**
	 * A private internal helper method that is used to extract all moment
	 * instances from the provided DateTimes (passed in as arguments).
	 * @param {...DateTime} datetimes
	 * @return {Moment[]} An array of moment instances extracted from the
	 * DateTimes
	 */
	static [ privateMethods.extractMomentsFromDateTimes ]( ...datetimes ) {
		return datetimes.map( ( datetime ) => {
			DateTime.assertIsDateTime( datetime );
			return datetime[ privateProperties.datetime ];
		} );
	}

	/**
	 * Given an indefinite number of DateTimes as arguments, this will return a
	 * new DateTime that represents the latest point in time.
	 * @param {...DateTime} datetimes
	 * @return {DateTime} A new DateTime representing the latest point of time.
	 */
	static max( ...datetimes ) {
		return DateTime.fromMoment(
			moment.max(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
		);
	}

	/**
	 * Given an indefinite number of DateTimes as arguments, this will return a
	 * new DateTime that represents the earliest point in time.
	 * @param {...DateTime} datetimes
	 * @return {DateTime} A new DateTime representing the earliest point in
	 * time.
	 */
	static min( ...datetimes ) {
		return DateTime.fromMoment(
			moment.min(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
		);
	}

	/**
	 * Constructs a DateTime from an instance of moment.
	 *
	 * @param {moment} momentInstance
	 * @return {DateTime} An instance of DateTime
	 */
	static fromMoment( momentInstance ) {
		if ( ! moment.isMoment( momentInstance ) ) {
			throw new TypeError( 'Requires an instance of moment.' );
		}
		// this would account for client code that is using `moment` but not
		// using `moment-timezone`.
		return isFunction( momentInstance.tz ) &&
			! isUndefined( momentInstance.tz() ) &&
			momentInstance.tz() !== 'UTC' ?
			new DateTime(
				momentInstance.toISOString(),
				momentInstance.tz(),
				momentInstance.locale()
			) :
			new DateTime(
				momentInstance.toISOString( true ),
				null,
				momentInstance.locale()
			);
	}

	/**
	 * Constructs a DateTime from an ISO 8601 string.
	 *
	 * @param {string} ISOString
	 * @param {string} timezone
	 * @param {string} locale
	 * @return {DateTime} An instance of DateTime
	 */
	static fromISO(
		ISOString,
		timezone = DEFAULT_TIMEZONE_STRING,
		locale = DEFAULT_VALID_LOCALE
	) {
		if ( isEmpty( ISOString ) ) {
			throw new InvalidISO8601String( ISOString );
		}
		return new DateTime( ISOString, timezone, locale );
	}

	/**
	 * Constructs a DateTime from an ISO 8601 String
	 * Differs with `fromISO` in that this allows passing a offset value
	 * instead of a timezone string.
	 *
	 * @param {string} ISOString
	 * @param {number} offset  In minutes unless > -16 or < -16 in which case it
	 * is treated as hours.
	 * @param {string} locale
	 * @return {DateTime}  An instance of DateTime
	 */
	static fromISOWithOffset(
		ISOString,
		offset = DEFAULT_OFFSET,
		locale = DEFAULT_VALID_LOCALE
	) {
		DateTime.assertISO8601IsValid( ISOString );
		DateTime.assertIsOffset( offset );
		DateTime.assertLocaleIsValid( locale );
		const datetime = moment.utc( ISOString )
			.utcOffset( offset, true )
			.locale( locale );
		return new DateTime.fromMoment( datetime );
	}

	/**
	 * Constructs a DateTime from a javascript Date object.
	 *
	 * @param {Date} date
	 * @param {string} timezone
	 * @param {string} locale
	 * @return {DateTime} Returns an instance of DateTime
	 */
	static fromJSDate(
		date,
		timezone = DEFAULT_TIMEZONE_STRING,
		locale = DEFAULT_VALID_LOCALE
	) {
		DateTime.assertIsDate( date );
		DateTime.assertTimezoneIsValid( timezone );
		DateTime.assertLocaleIsValid( locale );
		return DateTime.fromMoment(
			moment( date ).tz( timezone ).locale( locale )
		);
	}

	/**
	 * Constructs a Datetime from a javascript Date object.
	 *
	 * The difference between this and fromJSDate is that this can be set with
	 * an offset vs a timezone string.
	 *
	 * @param {Date} date
	 * @param {number} offset
	 * @param {string} locale
	 * @return {DateTime} Returns an instance of DateTime
	 */
	static fromJSDateWithOffset(
		date,
		offset = DEFAULT_OFFSET,
		locale = DEFAULT_VALID_LOCALE
	) {
		DateTime.assertIsDate( date );
		DateTime.assertIsOffset( offset );
		DateTime.assertLocaleIsValid( locale );
		return DateTime.fromMoment(
			moment( date ).utcOffset( offset ).locale( locale )
		);
	}

	/**
	 * Constructs a DateTime (in UTC) with milliseconds from epoch.
	 *
	 * @param {number} milliseconds
	 * @param {string} locale
	 * @return {DateTime} Returns an instance of DateTime
	 * @throws TypeError
	 */
	static fromMilliseconds( milliseconds, locale = DEFAULT_VALID_LOCALE ) {
		DateTime.assertLocaleIsValid( locale );
		if ( ! isNumber( milliseconds ) ) {
			throw new TypeError( 'Provided value must be a number ' +
				'representing milliseconds from the epoch' );
		}
		return DateTime.fromMoment(
			moment( milliseconds ).utc().locale( locale )
		);
	}

	/**
	 * Constructs a DateTime in UTC with seconds from the epoch.
	 *
	 * @param {number} seconds
	 * @param {string} locale
	 * @return {DateTime} An instance of DateTime
	 * @throws TypeError
	 */
	static fromUnix( seconds, locale = DEFAULT_VALID_LOCALE ) {
		DateTime.assertLocaleIsValid( locale );
		if ( ! isNumber( seconds ) ) {
			throw new TypeError( 'Provided value must be a number ' +
				'representing seconds from the epoch' );
		}
		return DateTime.fromMoment(
			moment.unix( seconds ).utc().locale( locale )
		);
	}

	/**
	 * Constructs a DateTime from an object of values assuming its in "local"
	 * time (if run via browser or server if run server side).
	 *
	 * The object is expected to be a representation of this instance in time:
	 * Eg.
	 * { year: 2018, month: 12, day: 25, hour: 0, minute: 15, seconds: 0 }
	 *
	 * Pass an empty values value if you want the instance in time to represent
	 * "now".
	 *
	 * @param {Object} values
	 * @param {string} locale
	 * @return {DateTime} An instance of DateTime
	 * @throws InvalidArgument
	 */
	static fromLocal( values, locale = DEFAULT_VALID_LOCALE ) {
		DateTime.assertLocaleIsValid( locale );
		values = DateTime[ privateMethods.normalizeUnitObject ]( values );
		const datetime = isEmpty( values ) ?
			moment().locale( locale ) :
			moment( values ).locale( locale );
		if ( datetime.isValid() !== true ) {
			throw new InvalidArgument(
				'Double-check the values you sent in.',
				values
			);
		}
		return DateTime.fromMoment( datetime );
	}

	/**
	 * Constructs a DateTime from an object of values and assumes its in
	 * 'UTC'.
	 *
	 * The object is expected to be a representation of this instance in time:
	 * Eg.
	 * { year: 2018, month: 12, day: 25, hour: 0, minute: 15, seconds: 0 }
	 *
	 * Any units not specified will be assumed to be `0`.
	 *
	 * Pass an empty values value if you want the instance in time to represent
	 * "now".
	 *
	 * @param {Object} values
	 * @param {string} locale
	 * @return {DateTime} An instance of DateTime
	 * @throws InvalidArgument
	 */
	static utc( values, locale = DEFAULT_VALID_LOCALE ) {
		DateTime.assertLocaleIsValid( locale );
		values = DateTime[ privateMethods.normalizeUnitObject ]( values );
		const datetime = isEmpty( values ) ?
			moment.utc().locale( locale ) :
			moment.utc( values ).locale( locale );
		if ( datetime.isValid() !== true ) {
			throw new InvalidArgument(
				'Double-check the values sent in.',
				values
			);
		}
		return DateTime.fromMoment( datetime );
	}

	/**
	 * Constructs a DateTime from a configuration object.
	 *
	 * The configuration object can have:
	 * - any of the DateTime units ('year', 'month', etc)
	 * - 'locale' a string representing the locale
	 * - 'timezone' a string representing the timezone
	 * - 'offset' a number representing the offset from UTC this instance in
	 * time represents.
	 *
	 * @param {Object} values
	 * @return {DateTime} An instance of DateTime
	 */
	static fromObject( values ) {
		const locale = values.locale || DEFAULT_VALID_LOCALE;
		const timezone = values.timezone || DEFAULT_TIMEZONE_STRING;
		const offset = isUndefined( values.offset ) ?
			null :
			values.offset;
		let valuesForConstruct = omit(
			values,
			[ 'locale', 'timezone', 'offset' ]
		);

		DateTime.assertLocaleIsValid( locale );

		if ( offset !== null ) {
			DateTime.assertIsOffset( offset );
			valuesForConstruct = DateTime[ privateMethods.normalizeUnitObject ](
				valuesForConstruct
			);
			const datetime = isEmpty( valuesForConstruct ) ?
				moment().utcOffset( offset, true ).locale( locale ) :
				moment.utc( valuesForConstruct )
					.utcOffset( offset, true )
					.locale( locale );
			if ( datetime.isValid() !== true ) {
				throw new InvalidArgument(
					'Double-check the configuration object sent in.',
					values
				);
			}
			return DateTime.fromMoment( datetime );
		}

		if ( timezone === DateTime.TIMEZONE_LOCAL ) {
			return DateTime.fromLocal( valuesForConstruct, locale );
		}

		DateTime.assertTimezoneIsValid( timezone );

		valuesForConstruct = DateTime[ privateMethods.normalizeUnitObject ](
			valuesForConstruct
		);
		const datetime = moment.tz( valuesForConstruct, timezone )
			.locale( locale );
		if ( datetime.isValid() !== true ) {
			throw new InvalidArgument(
				'Double-check the configuration object sent in.',
				values
			);
		}
		return DateTime.fromMoment( datetime );
	}

	/**
	 * Moment uses different names for some unit getters/setters/properties so
	 * this is used to normalize a given unit name to what moment uses.
	 *
	 * @param {string} nameToNormalize
	 * @return {string}  Normalized unit name.
	 */
	static [ privateMethods.normalizeUnitName ]( nameToNormalize ) {
		const map = {
			day: 'date',
			days: 'day',
			date: 'day',
			years: 'year',
			months: 'month',
			milliseconds: 'millisecond',
			minutes: 'minute',
			seconds: 'second',
			hours: 'hour',
		};
		return map[ nameToNormalize ] ?
			map[ nameToNormalize ] :
			nameToNormalize;
	}

	/**
	 * Handles normalizing unit values for internal library use.
	 *
	 * For example, moment zero indexes months. DateTime does not, so this
	 * method helps with normalizing month values for both setting (used by
	 * moment) and getting (returned to client).  This allows client code
	 * to expect months in DateTime to be handled with a non-zero index.
	 *
	 * @param {string} unit The unit to be normalized
	 * @param {mixed}  value The value for that unit
	 * @param {boolean} set  Whether this should normalize for setting or
	 * getting.
	 * @return {mixed}  The normalized value.
	 */
	static [ privateMethods.normalizeUnitValue ]( unit, value, set = true ) {
		if ( unit === 'month' ) {
			value = set ? value - 1 : value + 1;
		}
		return value;
	}

	/**
	 * Given a simple object containing units, this normalizes the object to
	 * what moment recognizes.
	 *
	 * @param {Object} setObject
	 * @param {boolean} set  true if setting the object, false if getting the
	 * object
	 * @return {Object} The normalized object.
	 */
	static [ privateMethods.normalizeUnitObject ]( setObject, set = true ) {
		if ( ! isObject( setObject ) ) {
			throw new TypeError(
				'The incoming value must be an object'
			);
		}
		return reduce( setObject, ( result, value, key ) => {
			key = DateTime[ privateMethods.normalizeUnitName ]( key );
			result[ key ] = DateTime[ privateMethods.normalizeUnitValue ](
				key,
				value,
				set
			);
			return result;
		}, {} );
	}

	/**
	 * Returns the date and time unit names
	 * @return {string[]} An array of unit names
	 */
	[ privateMethods.getUnitNames ]() {
		return validDateTimeUnits;
	}

	/**
	 * Creates the various getter and setters for the value object.
	 */
	[ privateMethods.createGettersAndSetters ]() {
		this[ privateMethods.getUnitNames ]().forEach(
			( unitName ) => {
				// creates accessor for getting the unit value via a
				// property (eg. instance.hour)
				Object.defineProperty( this, unitName, {
					get() {
						const methodName = DateTime[ privateMethods.normalizeUnitName ]( unitName );
						const unitValue = this[ privateProperties.datetime ]
							[ methodName ]();
						return DateTime[ privateMethods.normalizeUnitValue ](
							unitName,
							unitValue,
							false
						);
					},
				} );
				// creates a fluent setter for the value.
				Object.defineProperty( this, 'set' + capitalize( unitName ), {
					get() {
						return ( value ) => {
							return this.set( { [ unitName ]: value } );
						};
					},
				} );
			}
		);
	}

	/**
	 * Used to set various parts of the datetime string and returns a NEW
	 * instance of DateTime
	 *
	 * Note: this will construct a DateTime even with invalid units. Make use of
	 * `isValid()` to determine whether the instance is a valid DateTime or not.
	 *
	 * @param {{}} setObject An object where keys are the units.
	 * @return {DateTime} A new instance of DateTime.
	 */
	set( setObject = {} ) {
		setObject = DateTime[ privateMethods.normalizeUnitObject ]( setObject );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.set( setObject ).toISOString(),
			this.timezone,
			this.locale
		);
	}

	/**
	 * Accessor for the timezone string.
	 *
	 * @return {string} The timezone string
	 */
	get timezone() {
		return this[ privateProperties.datetime ].tz();
	}

	/**
	 * Fluent setter for the timezone property.
	 *
	 * @param {string} timezone
	 * @return {DateTime} Returns a new instance of DateTime
	 */
	setTimezone( timezone ) {
		DateTime.assertTimezoneIsValid( timezone );
		return new DateTime(
			this[ privateProperties.datetime ].toISOString(),
			timezone,
			this.locale
		);
	}

	/**
	 * Returns the number of days for the month set in this instance.
	 *
	 * @return {number}  The number of days in the month.
	 */
	get daysInMonth() {
		return this[ privateProperties.datetime ].daysInMonth();
	}

	/**
	 * Whether the current instance in time is currently in Daylight Savings
	 * Time.
	 *
	 * @return {boolean} True means it is currently in Daylight Savings Time.
	 */
	get isInDST() {
		return this[ privateProperties.datetime ].isDST();
	}

	/**
	 * Whether the current instance in time is currently in a leap year.
	 *
	 * @return {boolean} True means this date time is in a leap year.
	 */
	get isInLeapYear() {
		return this[ privateProperties.datetime ].isLeapYear();
	}

	/**
	 * Returns the offset from UTC for the current instance in time (in minutes).
	 * @return {number}  The offset is in minutes
	 */
	get offset() {
		return this[ privateProperties.datetime ].utcOffset();
	}

	/**
	 * A fluent setter for the UTC offset.
	 *
	 * The offset provided defaults to expecting in minutes.  However if the
	 * input is less than 16 and greater than -16, it will interpret the input
	 * as hours instead.
	 *
	 * @param {number} offset
	 * @return {DateTime} returns a new instance of DateTime
	 */
	setOffset( offset ) {
		DateTime.assertIsOffset( offset );
		return DateTime.fromMoment(
			this[ privateProperties.datetime ].clone().utcOffset( offset )
		);
	}

	/**
	 * Exposes the day of the year for the date and time in the object.
	 *
	 *
	 * @return {number} A number between 1 and 366 (depending on whether the
	 * internal date and time is in a leap year or not).
	 */
	get dayOfYear() {
		return this[ privateProperties.datetime ].dayOfYear();
	}

	/**
	 * Exposes the quarter for the date and time in the object.
	 *
	 * @return {number} A number between 1 and 4
	 */
	get quarter() {
		return this[ privateProperties.datetime ].quarter();
	}

	/**
	 * Exposes the ISO number of the week for the date and time in the object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number} Will be a number between 1 and 52ish
	 */
	get isoWeekNumber() {
		return this[ privateProperties.datetime ].isoWeek();
	}

	/**
	 * Exposes the ISO number for the week year for the date and time in the
	 * object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number}  Will be a number representing a year.
	 */
	get isoWeekYear() {
		return this[ privateProperties.datetime ].isoWeekYear();
	}

	/**
	 * Exposes the ISO number for the day of the week for the date and time in
	 * the object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number} A number between 1 and 7 (Monday is 1 and Sunday is 7)
	 */
	get isoWeekDay() {
		return this[ privateProperties.datetime ].isoWeekday();
	}

	/**
	 * Exposes the number of weeks in this DateTime's year.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 *
	 * @return {number} The number of weeks in the ISO year.
	 */
	get isoWeeksInWeekYear() {
		return this[ privateProperties.datetime ].isoWeeksInYear();
	}

	/**
	 * Returns what the set locale is for this DateTime
	 * @return {string} A locale string
	 */
	get locale() {
		return this[ privateProperties.datetime ].locale();
	}

	/**
	 * A fluent setter for setting the locale.
	 *
	 * @param {string} locale
	 * @return {DateTime} a new instance of DateTime equivalent to this one but
	 * with different locale.
	 */
	setLocale( locale ) {
		DateTime.assertLocaleIsValid( locale );
		return DateTime.fromMoment(
			this[ privateProperties.datetime ]
				.clone()
				.locale( locale )
		);
	}

	/**
	 * Whether this DateTime instance is valid.
	 *
	 * Typically an invalid state is achieved when the internal moment is
	 * invalid.  This can happen when the moment instance is created with
	 * invalid parameters.
	 *
	 * Note: with moment.timezone (which is the internal library),
	 * moment.isValid() could return true, false or a string for why it's
	 * invalid.  This is why a strict equality check is done for whether it is
	 * true or not.
	 *
	 * @return {boolean}  True means the instance is valid.
	 */
	isValid() {
		return this[ privateProperties.datetime ].isValid() === true;
	}

	/**
	 * Returns the difference between two DateTime instances as a Duration.
	 *
	 * @param {DateTime} otherDateTime
	 * @return {Duration} An instance of Duration representing the difference
	 * between the two DateTime objects.
	 */
	diff( otherDateTime ) {
		DateTime.assertIsDateTime( otherDateTime );
		return new Duration(
			moment.duration(
				this[ privateProperties.datetime ]
					.diff( otherDateTime[ privateProperties.datetime ] )
			)
		);
	}

	/**
	 * Returns the difference between this DateTime and "now" as a Duration.
	 * @return {Duration} An instance of Duration representing the difference
	 * between this DateTime and "now"
	 */
	diffNow() {
		return new Duration(
			moment.duration(
				this[ privateProperties.datetime ]
					.diff( moment() )
			)
		);
	}

	/**
	 * Set the value of this DateTime to the end (i.e. the last millisecond) of
	 * a unit of time.
	 * @param {string} unit
	 * @return {DateTime} Returns a new DateTime instance.
	 */
	endOf( unit ) {
		return DateTime.fromMoment(
			this[ privateProperties.datetime ].clone().endOf( unit )
		);
	}

	/**
	 * Compares this DateTime with provided DateTime and returns whether they
	 * are equal to each other.
	 *
	 * The two DateTimes are considered equal if they represent the same
	 * millisecond, have the same zone and location, and are both valid.
	 *
	 * @param {DateTime} otherDateTime
	 * @return {boolean}  True means they are equal
	 */
	equals( otherDateTime ) {
		DateTime.assertIsDateTime( otherDateTime );
		return this[ privateProperties.datetime ]
			.isSame( otherDateTime[ privateProperties.datetime ] );
	}

	/**
	 * Whether this DateTime is in the same unit of time as another DateTime
	 *
	 * eg. DateTime.fromLocal().hasSame( otherDT, 'day' ) //~> true if both the
	 * same calendar day.
	 *
	 * Note: this will match all units equal or larger.  For example, passing in
	 * `month` will check `month` and `year`.  So it's not only checking if the
	 * two dates share the same month, but that they are the same month in the
	 * same year.  If you passed in day, it would return whether the provided
	 * DateTime is in the same day, month and year as this DateTime.
	 *
	 * @param {DateTime} otherDateTime
	 * @param {string} unit
	 * @return {boolean}  True means they are both in the same time for the
	 * given unit.
	 */
	hasSame( otherDateTime, unit ) {
		DateTime.assertIsDateTime( otherDateTime );
		return this[ privateProperties.datetime ]
			.isSame( otherDateTime[ privateProperties.datetime ], unit );
	}

	/**
	 * Subtract a period of time (represented by a Duration) from this DateTime
	 * and return the resulting DateTime.
	 *
	 * @param {Duration} duration
	 * @return {DateTime} A new instance of DateTime for the new date and time.
	 */
	minus( duration ) {
		Duration.assertIsValidDuration( duration );
		return DateTime.fromMoment(
			this[ privateProperties.datetime ]
				.clone()
				.subtract( duration.toObject() )
		);
	}

	/**
	 * Add a period of time (represented by a Duration) to this DateTime and
	 * return the resulting DateTime
	 * @param {Duration} duration
	 * @return {DateTime} A new instance of DateTime for the new date and time.
	 */
	plus( duration ) {
		Duration.assertIsValidDuration( duration );
		return DateTime.fromMoment(
			this[ privateProperties.datetime ]
				.clone()
				.add( duration.toObject() )
		);
	}

	/**
	 * Set the value of this DateTime to the beginning of a specified unit of
	 * time and return a new DateTime representing that.
	 *
	 * eg.
	 * startOf( DateTime.UNIT_YEAR ) //sets to January 1st, 12:00am this
	 * year.
	 * startOf( DateTime.UNIT_MONTH ) //sets to the first of this month, 12:00am
	 *
	 * @param {string} unit
	 * @return {DateTime} A new instance of DateTime
	 */
	startOf( unit ) {
		return DateTime.fromMoment(
			this[ privateProperties.datetime ].clone().startOf( unit )
		);
	}

	/**
	 * Returns a string representation of this DateTime formatted according to
	 * the specified format string.
	 *
	 * @link https://momentjs.com/docs/#/displaying/format/
	 * @see Moment format ^^ section for the available formats that can be used.
	 *
	 * An empty format value will return the string formatted in ISO 8601 with
	 * any offset included.
	 *
	 * Without any argument passed, the format will be whatever string the
	 * format is server side.
	 *
	 * @param {string} format
	 * @return {string}  The date and time displayed according to the provided
	 * format.
	 */
	toFormat( format = DEFAULT_FORMAT ) {
		return this[ privateProperties.datetime ].format( format );
	}

	/**
	 * Returns a string representation of this DateTime formatted according to
	 * the ISO 8601 standard.
	 *
	 * If `inUTC` is true (default) then `toISO` will return the ISO string in
	 * UTC. Otherwise it will include the offset information for the internal
	 * timezone/offset on the moment in time.
	 *
	 * @param {boolean} inUTC
	 * @return {string} An ISO8601 string
	 */
	toISO( inUTC = true ) {
		return inUTC ?
			this[ privateProperties.datetime ].toISOString() :
			this[ privateProperties.datetime ].toISOString( true );
	}

	/**
	 * Returns the value for this DateTime as a javascript Date object.
	 *
	 * @return {Date} A javascript Date instance
	 */
	toJSDate() {
		return this[ privateProperties.datetime ].toDate();
	}

	/**
	 * When serializing an object to JSON, if there is a DateTime instance, it
	 * will be represented as an ISO8601 string.
	 *
	 * @return {string} An ISO 8601 string
	 */
	toJSON() {
		return this[ privateProperties.datetime ].toISOString();
	}

	/**
	 * Converts a DateTime to whatever the "local" time is.
	 *
	 * @return {DateTime} a new instance of the DateTime
	 */
	toLocal() {
		return DateTime.fromMoment(
			this[ privateProperties.datetime ].clone().local()
		);
	}

	/**
	 * Returns the milliseconds since the Unix Epoch for the current DateTime
	 * instance.
	 * @return {number} Number of milliseconds since Unix Epoch
	 */
	toMillis() {
		return this.valueOf();
	}

	/**
	 * Returns a simple object containing year, month, day, hour,
	 * minute, second, and millisecond.
	 * @return {Object} An object with year, month, day, hour, minute, second,
	 * and millisecond.
	 */
	toObject() {
		const datetime = this[ privateProperties.datetime ].toObject();
		return reduce( datetime, ( result, value, key ) => {
			key = DateTime[ privateMethods.normalizeUnitName ]( key );
			result[ key ] = DateTime[ privateMethods.normalizeUnitValue ](
				key,
				value,
				false
			);
			return result;
		}, {} );
	}

	/**
	 * Converts the DateTime's timezone to UTC.
	 *
	 * @return {DateTime} A new instance of DateTime
	 */
	toUTC() {
		return DateTime.fromMoment(
			this[ privateProperties.datetime ].clone().utc()
		);
	}

	/**
	 * Returns an english string representation of this DateTime when the instance is
	 * coerced to a string (similar format to JS `Date.toString()`.
	 *
	 * eg `Tue Dec 25 2018 10:15:00 GMT+0000`
	 *
	 * @return {string} A string representation of this DateTime
	 */
	toString() {
		return this[ privateProperties.datetime ].toString();
	}

	/**
	 * When DateTime is coerced to number this will ensure its displayed as the
	 * number of milliseconds since the Unix Epoch for the current DateTime
	 *
	 * @return {number} Amount of milliseconds since the Unix Epoch
	 */
	valueOf() {
		return this[ privateProperties.datetime ].valueOf();
	}
}

/**
 * These static properties need to be defined outside of the class definition
 * because of compile issues.
 */
DateTime.UNIT_YEAR = 'year';
DateTime.UNIT_MONTH = 'month';
DateTime.UNIT_DAY = 'day';
DateTime.UNIT_HOUR = 'hour';
DateTime.UNIT_MINUTE = 'minute';
DateTime.UNIT_SECOND = 'second';
DateTime.UNIT_MILLISECOND = 'millisecond';
DateTime.TIMEZONE_LOCAL = 'local';
