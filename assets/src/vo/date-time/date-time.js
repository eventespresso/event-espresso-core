/**
 * External imports
 */
import moment from 'moment';
import { capitalize, omit, isNumber, isEmpty, reduce } from 'lodash';

/**
 * Internal imports
 */
import {
	InvalidDateTime,
	InvalidArgument,
} from '@eventespresso/eejs';
import * as assertions from './assertions';
import Duration from 'duration';

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
 * 	extractMomentsFromDateTimes: Symbol
 * 	}
 * }
 */
const privateMethods = {
	getUnitNames: Symbol( 'DateTimeMethodGetUnitNames' ),
	createGettersAndSetters: Symbol( 'DateTimeMethodCreateGettersAndSetters' ),
	extractMomentsFromDateTimes: Symbol( 'DateTimeMethodExtractMomentsFromDateTimes' ),
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
export class DateTime {
	/**
	 * The constructor for the DateTime class
	 *
	 * @param {Moment|string} iso8601DateString  The public api
	 * expects an ISO 8601 date-time string.  However for internal use, a moment
	 * object is handled as well (for performance reasons).  Client code should
	 * not construct with a moment object because that will be fragile in the
	 * case the internal library is changed in the future.
	 * @param {string} timezone
	 * @param {string} locale
	 */
	constructor( iso8601DateString = '', timezone = 'UTC', locale = 'en' ) {
		/**
		 * If a moment object is provided just construct from that.  This will
		 * not be promoted as public api though.  It's mostly just used
		 * internally for performance reasons.
		 */
		if ( moment.isMoment( iso8601DateString ) ) {
			this[ privateProperties.datetime ] = iso8601DateString;
		} else {
			if ( iso8601DateString !== '' ) {
				DateTime.assertISO8601IsValid( iso8601DateString );
			}
			DateTime.assertTimezoneIsValid( timezone );
			DateTime.assertLocaleIsValid( locale );
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
	 * Indicates whether the provided value is an instance of DateTime
	 * @param {DateTime} datetime
	 * @return {boolean} returns true if it is an instance of DateTime
	 */
	static validateIsDateTime( datetime ) {
		return datetime instanceof DateTime;
	}

	/**
	 * Asserts whether the provided value is an instance of DateTime
	 * @param {DateTime} datetime
	 * @throws InvalidDateTime
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
	 * @param {DateTime[]} datetimes
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
	 * @param {DateTime[]} datetimes
	 * @return {DateTime} A new DateTime representing the latest point of time.
	 */
	static max( ...datetimes ) {
		return new DateTime(
			moment.max(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
		);
	}

	/**
	 * Given an indefinite number of DateTimes as arguments, this will return a
	 * new DAteTime that represents the earliest point in time.
	 * @param {DateTime[]} datetimes
	 * @return {DateTime} A new DateTime representing the earliest point in
	 * time.
	 */
	static min( ...datetimes ) {
		return new DateTime(
			moment.min(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
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
	static fromISO( ISOString, timezone = 'UTC', locale = 'en-us' ) {
		return new DateTime( ISOString, timezone, locale );
	}

	/**
	 * Constructs a DateTime from a javascript Date object.
	 *
	 * @param {Date} date
	 * @param {string} timezone
	 * @param {string} locale
	 * @return {DateTime} Returns an instance of DateTime
	 */
	static fromJSDate( date, timezone = 'UTC', locale = 'en-us' ) {
		DateTime.assertIsDate( date );
		DateTime.assertTimezoneIsValid( timezone );
		DateTime.assertLocaleIsValid( locale );
		return new DateTime(
			moment( date ).tz( timezone ).locale( locale )
		);
	}

	/**
	 * Constructs a DateTime with milliseconds from epoch.
	 *
	 * @param {number} milliseconds
	 * @param {string} locale
	 * @return {DateTime} Returns an instance of DateTime
	 * @throws TypeError
	 */
	static fromMillis( milliseconds, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		if ( ! isNumber( milliseconds ) ) {
			throw new TypeError( 'Provided value must be a number' );
		}
		return new DateTime(
			moment( milliseconds ).locale( locale )
		);
	}

	/**
	 * Constructs a DateTime with seconds from epoch.
	 *
	 * @param {number} seconds
	 * @param {string} locale
	 * @return {DateTime} An instance of DateTime
	 * @throws TypeError
	 */
	static fromUnix( seconds, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		if ( ! isNumber( seconds ) ) {
			throw new TypeError( 'Provided value must be a number' );
		}
		return new DateTime(
			moment.unix( seconds ).locale( locale )
		);
	}

	/**
	 * Constructs a DateTime from an object of values assuming its in "local"
	 * time (browser or server if run server side).
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
	static local( values, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		const datetime = isEmpty( values ) ?
			moment().locale( locale ) :
			moment( values ).locale( locale );
		if ( ! datetime.isValid() ) {
			throw new InvalidArgument(
				'Double-check the values you sent in.',
				values
			);
		}
		return new DateTime( datetime );
	}

	/**
	 * Constructs a DateTime from an object of values and assumes its in
	 * 'utc'.
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
	static utc( values, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		const datetime = isEmpty( values ) ?
			moment.utc().locale( locale ) :
			moment.utc( values ).locale( locale );
		if ( ! datetime.isValid() ) {
			throw new InvalidArgument(
				'Double-check the values sent in.',
				values
			);
		}
		return new DateTime( datetime );
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
		if ( typeof values !== 'object' ) {
			throw new TypeError(
				'The incoming configuration argument must be an object'
			);
		}
		const locale = values.locale || 'en-us';
		const timezone = values.timezone || 'local';
		const offset = values.offset || null;
		const valuesForConstruct = omit(
			values,
			[ 'locale', 'timezone', 'offset' ]
		);
		if ( offset !== null ) {
			const datetime = isEmpty( valuesForConstruct ) ?
				moment.utc().offset( offset ).locale( locale ) :
				moment.utc( valuesForConstruct )
					.offset( offset )
					.locale( locale );
			if ( ! datetime.isValid() ) {
				throw new InvalidArgument(
					'Double-check the configuration object sent in.',
					values
				);
			}
			return new DateTime( datetime );
		}

		if ( timezone === 'local' ) {
			return DateTime.local( valuesForConstruct, locale );
		}

		const datetime = moment.tz( valuesForConstruct, timezone )
			.locale( locale );
		if ( ! datetime.isValid() ) {
			throw new InvalidArgument(
				'Double-check the configuration object sent in.',
				values
			);
		}
		return new DateTime( datetime );
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
				// creates accessor for getting and setting the value via a
				// property
				// eg. instance.hour or instance.hour = 3
				Object.defineProperty( this, unitName, {
					get() {
						return this[ privateProperties.datetime ]
							[ unitName ]();
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
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.set( setObject ),
			this.timezone,
			this.locale
		);
	}

	/**
	 * Accessor for the timezone string.
	 *
	 * @return {string}
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
			this[ privateProperties.datetime ]
				.clone(),
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
		return new DateTime(
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
		return this[ privateProperties.datetime].quarter();
	}

	/**
	 * Exposes the ISO number of the week for the date and time in the object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number} Will be a number between 1 and 52ish
	 */
	get weekNumber() {
		return this[ privateProperties.datetime ].isoWeek();
	}

	/**
	 * Exposes the ISO number for the week year for the date and time in the
	 * object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number}  Will be a number representing a year.
	 */
	get weekYear() {
		return this[ privateProperties.datetime ].isoWeekYear();
	}

	/**
	 * Exposes the ISO number for the day of the week for the date and time in
	 * the object.
	 * @link https://en.wikipedia.org/wiki/ISO_week_date
	 * @return {number} A number between 1 and 7 (Monday is 1 and Sunday is 7)
	 */
	get weekDay() {
		return this[ privateProperties.datetime ].isoWeekday();
	}

	/**
	 * Exposes the number of weeks in this DateTime's year.
	 *
	 * @return {number} A number between 1 and 52ish
	 */
	get weeksInWeekYear() {
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
		return new DateTime(
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
	 * @return {boolean}  True means the instance is invalid.
	 */
	isValid() {
		return this[ privateProperties.datetime ].isValid();
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
	 * @return {DateTime} Returns a new DateTime instance.s
	 */
	endOf( unit ) {
		return new DateTime(
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
	 * eg. DateTime.local().hasSame( otherDT, 'day' ) //~> tru if both the same
	 * calendar day.
	 *
	 * @param {DateTime} otherDateTime
	 * @param {string} unit
	 * @return {boolean}  True means they are both in the same unit of time.
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
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.subtract( duration.toObject() )
		);
	}

	/**
	 * Add a period of time (represented by a Duration) from this DateTime and
	 * return the resulting DateTime
	 * @param {Duration} duration
	 * @return {DateTime} A new instance of DateTime for the new date and time.
	 */
	plus( duration ) {
		Duration.assertIsValidDuration( duration );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.add( duration.toObject() )
		);
	}

	/**
	 * Set the value of this DateTime to the beginning of a specified unit of
	 * time and return a new DateTime representing that.
	 *
	 * @param {string} unit
	 * @return {DateTime} A new instance of DateTime
	 */
	startOf( unit ) {
		return new DateTime(
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
	 * @param {string} format
	 * @return {string}  The date and time displayed according to the provided
	 * format.
	 */
	toFormat( format ) {
		return this[ privateProperties.datetime ].format( format );
	}

	/**
	 * Returns a string representation of this DateTime formatted according to
	 * the ISO 8601 standard (including any offset information that might
	 * exist).
	 * @return {string} An ISO8601 string
	 */
	toISO() {
		return this[ privateProperties.datetime ].toISOString( true );
	}

	/**
	 * Returns the value for this DateTime as a javascript Date object.
	 *
	 * @return {Date}
	 */
	toJSDate() {
		return this[ privateProperties.datetime ].toJSDate();
	}

	/**
	 * When serializing an object to JSON, if there is a DateTime instance, it
	 * will be represented as an ISO8601 string.
	 *
	 * @return {string}
	 */
	toJSON() {
		return this[ privateProperties.datetime ].format();
	}

	/**
	 * Converts a DateTime to whatever the "local" time is.
	 *
	 * @return {DateTime} a new instance of the DateTime
	 */
	toLocal() {
		return new DateTime(
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
			key = key === 'date' ? 'day' : key;
			key = key === 'seconds' ? 'second' : key;
			key = key === 'milliseconds' ? 'millisecond' : key;
			result[ key ] = value;
			return result;
		}, {} );
	}

	/**
	 * Converts the DateTime's timezone to UTC.
	 *
	 * @return {DateTime} A new instance of DateTime
	 */
	toUTC() {
		return new DateTime(
			this[ privateProperties.datetime ].clone().utc()
		);
	}

	/**
	 * Returns an english string representation of this DateTime when the instance is
	 * coerced to a string (similar format to JS `Date.toString()`.
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
