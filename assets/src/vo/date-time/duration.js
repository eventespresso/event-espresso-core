/**
 * External imports
 */
import moment from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';
import { capitalize, pick, keys, omit, mapValues } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal';
import warning from 'warning';

/**
 * Internal imports
 */
import * as assertions from './assertions';
import {
	DEFAULT_VALID_LOCALE,
} from './defaults';

momentDurationFormatSetup( moment );

/**
 * A collection of symbols used for "private" properties in the Duration object.
 * @type {
 * 	{
 * 		duration: Symbol,
 * 		values: Symbol,
 * 		isValid: Symbol,
 * 	}
 * }
 */
const privateProperties = {
	duration: Symbol( 'DurationPrivatePropertiesDuration' ),
	durationValues: Symbol( 'DurationPrivatePropertiesDurationValues' ),
	isValid: Symbol( 'DurationPrivatePropertiesIsValid' ),
};

/**
 * A collection of symbols used for "private" methods in the Duration object.
 * @type {
 * 	{
 * 		createGettersAndSetters: Symbol,
 * 		getAllUnitNames: Symbol,
 * 		populateValuesFromDuration: Symbol,
 * 		setValues: Symbol,
 * 	    filterValues: Symbol,
 * 	}
 * }
 */
const privateMethods = {
	createGetters: Symbol( 'DurationPrivateMethodsCreateGetters' ),
	getAllUnitNames: Symbol( 'DurationPrivateMethodsGetAllUnitNames' ),
	populateValuesFromDuration: Symbol(
		'DurationPrivateMethodsPopulateValuesFromDuration'
	),
	setValues: Symbol( 'DurationPrivateMethodsSetValues' ),
	filterValues: Symbol( 'DurationPrivateMethodsFilterValues' ),
};

/**
 * An array of unit names for properties in the Duration object
 * @type {string[]}
 */
const unitNames = [
	'years',
	'months',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
];

/**
 * An array of derivative unit names.
 * These are accessors that are derivatives of base units.  For instance,
 * "weeks" ends up being a derivative (calculated from) the "days" unit.
 * @type {string[]}
 */
const derivativeUnitNames = [
	'weeks',
];

/**
 * Where a DateTime object represents a single point in time, a Duration object
 * represents a length of time.
 *
 * Durations do not have a defined beginning and end date.  They are contextless.
 *
 * As an example, durations are representative of something like "2 hours" and
 * not representative of something like "between 1pm and 3pm".
 *
 * Internally, the Duration class here uses `moment.Duration`.  This is an
 * abstraction loosely following the adapter pattern so that there is a common
 * api that can be depended on if in the future the internal library is switched
 * to something different (such as Luxon).
 */
export default class Duration {
	static UNIT_YEARS = 'years';
	static UNIT_MONTHS = 'months';
	static UNIT_DAYS = 'days';
	static UNIT_HOURS = 'hours';
	static UNIT_MINUTES = 'minutes';
	static UNIT_SECONDS = 'seconds';
	static UNIT_MILLISECONDS = 'milliseconds';
	static UNIT_WEEKS = 'weeks';

	/**
	 * The constructor for the Duration class.
	 *
	 * @param {Object|moment.Duration|string|number} values
	 * Receiving a moment.Duration object is something for internal use and should not be used directly via
	 * client code.
	 * @param {string} locale  A valid locale string.
	 * 							@link http://tools.ietf.org/html/rfc5646
	 */
	constructor( values, locale = DEFAULT_VALID_LOCALE ) {
		this[ privateProperties.isValid ] = true;
		assertions.assertLocaleIsValid( locale );
		if ( typeof values !== 'object' ) {
			values = moment.duration( values ).locale( locale );
		}
		if ( moment.isDuration( values ) ) {
			this[ privateProperties.duration ] = values;
			this[ privateMethods.populateValuesFromDuration ]( values );
		} else {
			values = this[ privateMethods.filterValues ]( values );
			this[ privateMethods.setValues ]( values );
			this[ privateProperties.duration ] = moment.duration(
				values
			).locale( locale );
		}
		this[ privateMethods.createGetters ]();
		Object.freeze( this );
	}

	/**
	 * Create an instance of Duration from a number of milliseconds.
	 * @param {number} milliseconds
	 * @param {string} locale
	 * @return {Duration}  An instance of Duration.
	 */
	static fromMilliseconds( milliseconds, locale = DEFAULT_VALID_LOCALE ) {
		return new Duration( { milliseconds }, locale );
	}

	/**
	 * Create an instance of Duration from a simple object.
	 *
	 * @param {Object} values  Keys should be the units (eg 'years', 'days').
	 * @param {string} locale
	 * @return {Duration} An instance of Duration
	 */
	static fromObject( values, locale = DEFAULT_VALID_LOCALE ) {
		return new Duration( values, locale );
	}

	/**
	 * Create an instance of Duration from an ISO8601 string.
	 *
	 * @param {string} ISOString (eg. 'PT23H')
	 * @param {string} locale
	 * @return {Duration} An instance of Duration
	 */
	static fromISO( ISOString, locale = DEFAULT_VALID_LOCALE ) {
		assertions.assertISO8601IsValid( ISOString, true );
		return new Duration( ISOString, locale );
	}

	/**
	 * Indicate whether the provided locale argument is a valid locale.
	 *
	 * @param {string} locale
	 * @return {boolean}  True means it is valid.
	 */
	static isValidLocale( locale ) {
		return assertions.validateLocale( locale );
	}

	/**
	 * Asserts whether the provided locale argument is a valid locale.
	 *
	 * @param {string} locale
	 * @throws InvalidLocale
	 */
	static assertIsValidLocale( locale ) {
		assertions.assertLocaleIsValid( locale );
	}

	/**
	 * Indicate whether the provided string is a valid ISO 8601 Duration string.
	 *
	 * @param {string} isoString
	 * @return {boolean} True means it is valid.
	 */
	static isValidISO8601Duration( isoString ) {
		return assertions.validateISO8601( isoString, true );
	}

	/**
	 * Assert whether the provided string is a valid ISO 8601 Duration string.
	 *
	 * @param {string} isoString
	 * @throws InvalidISO8601String
	 */
	static assertIsValidISO8601Duration( isoString ) {
		assertions.assertISO8601IsValid( isoString );
	}

	/**
	 * Indicates whether the provided value is a valid instance of Duration.
	 * @param {mixed|Duration}duration
	 * @return {boolean}  True means it is a valid Duration object.
	 */
	static isValidDuration( duration ) {
		return duration instanceof Duration && duration.isValid;
	}

	/**
	 * Asserts whether the provided value is a valid Duration and throws an
	 * exception if not.
	 * @param {mixed|Duration} duration
	 * @throws TypeError
	 */
	static assertIsValidDuration( duration ) {
		if ( ! Duration.isValidDuration( duration ) ) {
			throw new TypeError(
				'This Duration object is not valid.'
			);
		}
	}

	/**
	 * Indicates whether the provided value is an instance of Duration.
	 *
	 * @param {Duration|mixed} duration
	 * @return {boolean}  True means the value is an instance of Duration.
	 * Note: true may still mean that the Duration instance is not valid!
	 */
	static isDuration( duration ) {
		return duration instanceof Duration;
	}

	/**
	 * Asserts whether the provided value is an instance of Duration and if not
	 * throws an exception.
	 *
	 * @param {Duration|mixed} duration
	 * @throws TypeError
	 */
	static assertIsDuration( duration ) {
		if ( ! Duration.isDuration( duration ) ) {
			throw new TypeError(
				'The provided value is not an instance of Duration.'
			);
		}
	}

	/**
	 * This filters the incoming values and returns only key/value pairs that
	 * are acceptable as duration units.
	 *
	 * If a invalid duration unit is discovered, a console.error is generated
	 * (in non-production mode).
	 *
	 * @param {mixed} values
	 * @return {Object} Filtered values.
	 * @throws TypeError if incoming values argument is not an object.
	 */
	[ privateMethods.filterValues ]( values ) {
		if ( typeof values !== 'object' ) {
			throw new TypeError( 'Incoming values must be a simple object.' );
		}
		const valuesToSet = pick( values, unitNames );
		if ( ! isShallowEqual( values, valuesToSet ) ) {
			warning(
				false,
				'The following unexpected keys were in the configuration ' +
				'object for constructing the Duration: ' +
				keys( omit( values, unitNames ) ).join()
			);
			this[ privateProperties.isValid ] = false;
		}
		return valuesToSet;
	}

	/**
	 * Used to set the internal "private" values property.
	 *
	 * @param {Object} values
	 * @access private
	 */
	[ privateMethods.setValues ]( values ) {
		this[ privateProperties.durationValues ] = {};
		unitNames.forEach( ( unit ) => {
			this[ privateProperties.durationValues ][ unit ] = values[ unit ] ||
				0;
		} );
	}

	/**
	 * Used to set the values "private" property from a moment.Duration object.
	 *
	 * @param {moment.Duration} duration
	 * @access private
	 */
	[ privateMethods.populateValuesFromDuration ]( duration ) {
		const setValues = {};
		unitNames.forEach( ( unit ) => {
			setValues[ unit ] = duration[ unit ]();
		} );
		this[ privateMethods.setValues ]( setValues );
	}

	/**
	 * Returns an array of accessor names (that in turn are used for generating
	 * private properties).
	 *
	 * @access private
	 * @return {string[]}  Array of accessor names.
	 */
	[ privateMethods.getAllUnitNames ]() {
		return [
			...unitNames,
			...derivativeUnitNames,
		];
	}

	/**
	 * Creates getters for the Duration instance from the accessor names.
	 * @access private
	 */
	[ privateMethods.createGetters ]() {
		this[ privateMethods.getAllUnitNames ]().forEach(
			( accessorName ) => {
				// creates accessor for getting the value via a property
				// eg. instance.hours
				Object.defineProperty( this, accessorName, {
					get() {
						if ( derivativeUnitNames.indexOf( accessorName ) > -1 ) {
							return this[ privateProperties.duration ][ accessorName ]();
						}
						return this
							[ privateProperties.durationValues ]
							[ accessorName ] ||
							0;
					},
				} );
				// creates `as*` methods.
				// eg `instance.asHours` would return the given duration
				// expressed as the hours unit.
				// note for units such as "years" and "months", this uses what
				// is termed as "longterm" calculation. Longterm is based on
				// a 400 year cycle averaging out the days in a month and
				// days in a year over that cycle.
				// @link https://github.com/moment/moment/blob/develop/src/lib/duration/bubble.js#L52
				const asMethodName = 'as' + capitalize( accessorName );
				Object.defineProperty( this, asMethodName, {
					get() {
						return () => {
							return this[ privateProperties.duration ]
								[ asMethodName ]();
						};
					},
				} );
			}
		);
	}

	/**
	 * Exposes the value of locale.
	 * eg. instance.locale
	 * @return {string} The locale string.
	 */
	get locale() {
		return this[ privateProperties.duration ].locale();
	}

	/**
	 * Indicates whether the current Duration instance represents a valid
	 * duration.
	 *
	 * @return {boolean} True means the Duration instance is valid.
	 */
	get isValid() {
		return this[ privateProperties.isValid ] &&
			this[ privateProperties.duration ].toISOString() !== 'P0D';
	}

	/**
	 * Returns a new Duration instance that is identical to this except the
	 * locale is changed to what was provided.
	 * @param {string} locale
	 * @return {Duration} A new instance of Duration
	 */
	setLocale( locale ) {
		return new Duration( this[ privateProperties.durationValues ], locale );
	}

	/**
	 * Reduce this Duration to its canonical representation in its current units.
	 *
	 * For example:
	 * Duration
	 *     .fromObject({ years: 2, days: 5000 })
	 *     .normalize()
	 *     .toObject() //=> { years: 15, months: 8, days: 12 }
	 *
	 * @return {Duration} A new instance of Duration
	 */
	normalize() {
		return new Duration( this[ privateProperties.duration ] );
	}

	/**
	 * Returns whether the provided Duration instance is the same as this
	 * Duration instance.
	 *
	 * @param {Duration|mixed} otherDuration
	 * @throws TypeError
	 * @return {boolean} True means that the compared durations have the same
	 * units and the same values for each unit (as well as same locale). This
	 * means that a duration with{ minutes: 60 } would be considered not equal
	 * to a duration with { hours: 1 }.
	 */
	sameAs( otherDuration ) {
		Duration.assertIsDuration( otherDuration );
		if ( ! this.isValid || ! otherDuration.isValid ) {
			return false;
		}
		if ( this.locale !== otherDuration.locale ) {
			return false;
		}
		return isShallowEqual( this.toObject(), otherDuration.toObject() );
	}

	/**
	 * Returns whether the provided Duration instance is equal to this Duration
	 * instance.
	 *
	 * Equality is based on:
	 * - locale is the same
	 * - the normalized value of the duration is the same.  eg a duration with
	 * { hours: 24 } would be considered equal to a duration with { days: 1 }
	 *
	 * @param {Duration|mixed} otherDuration
	 * @throws TypeError
	 * @return {boolean} true if considered equal
	 */
	equals( otherDuration ) {
		Duration.assertIsDuration( otherDuration );
		if ( ! this.isValid || ! otherDuration.isValid ) {
			return false;
		}
		if ( this.locale !== otherDuration.locale ) {
			return false;
		}
		return isShallowEqual(
			this.normalize().toObject(),
			otherDuration.normalize().toObject()
		);
	}

	/**
	 * Make this duration longer by the specified amount.
	 *
	 * Note: the returned Duration will have the locale of the original
	 * regardless what the locale was on any passed in duration.
	 *
	 * The new Duration returned will have normalized values (i.e. if addition
	 * of one Duration with `{ hours: 10 }` is done with the other Duration
	 * having `{ hours: 14 }` then the new Duration will have `{ days: 1 }`.
	 * You can still get the total hours by calling `newDuration.asHours()`.
	 *
	 * @param {Duration|Object|number} value  Either a Duration instance, a
	 * number of milliseconds or an object in the same shape received by
	 * Duration.fromObject()
	 *
	 * @return {Duration} A new instance of Duration
	 */
	plus( value ) {
		if ( Duration.isDuration( value ) ) {
			return new Duration(
				this[ privateProperties.duration ]
					.clone()
					.add( value[ privateProperties.duration ] )
			);
		}
		if ( typeof value === 'object' ) {
			value = this[ privateMethods.filterValues ]( value );
		}
		return new Duration(
			this[ privateProperties.duration ]
				.clone()
				.add( value )
		);
	}

	/**
	 * Make this duration shorter by the specified amount
	 *
	 * Note: the returned Duration will have the locale of the original
	 * regardless what the locale was on any passed in duration.
	 *
	 * The new Duration returned will have normalized values (i.e. if subtraction
	 * of one Duration with `{ hours: 34 }` is done with the other Duration
	 * having `{ hours: 10 }` then the new Duration will have `{ days: 1 }`.
	 * You can still get the total hours by calling `newDuration.asHours()`.
	 *
	 * @param {Duration|Object|number} value Either a duration instance, a
	 * number of milliseconds or an object in the same shape as that received by
	 * Duration.fromObject()
	 *
	 * @return {Duration} A new instance of Duration
	 */
	minus( value ) {
		if ( Duration.isDuration( value ) ) {
			return new Duration(
				this[ privateProperties.duration ]
					.clone()
					.subtract( value[ privateProperties.duration ] )
			);
		}
		if ( typeof value === 'object' ) {
			value = this[ privateMethods.filterValues ]( value );
		}
		return new Duration(
			this[ privateProperties.duration ]
				.clone()
				.subtract( value )
		);
	}

	/**
	 * Returns the negative of this Duration.
	 *
	 * @return {Duration} A new instance of Duration
	 */
	negate() {
		return new Duration(
			mapValues( this.toObject(), function( value ) {
				return value * -1;
			} )
		);
	}

	/**
	 * Returns a javascript object with this Duration's values.
	 *
	 * @return {*} Returns { years: number, hours: number ... }
	 */
	toObject() {
		return this[ privateProperties.durationValues ];
	}

	/**
	 * Returns an ISO 8601-compliant string representation of this Duration.
	 * @return {string} eg. "PT24H"
	 */
	toISO() {
		return this[ privateProperties.duration ].toISOString();
	}

	/**
	 * Returns an ISO 8601 representation of this Duration appropriate for use
	 * in JSON.
	 * @return {string} eg. "PT24H"
	 */
	toJSON() {
		return this[ privateProperties.duration ].toJSON();
	}

	/**
	 * Returns an ISO 8601 representation of this Duration appropriate for use
	 * in debugging.
	 * @return {string} eg. "PT24H"
	 */
	toString() {
		return this.toISO();
	}

	/**
	 * Returns an milliseconds value of this Duration.
	 * @return {number} The value of this duration represented in the number of
	 * milliseconds.
	 */
	valueOf() {
		return this.asMilliseconds();
	}

	/**
	 * Returns a string representation of this Duration formatted according to
	 * the specified format string.
	 *
	 * Currently this accepts the following tokens in the format string:
	 *
	 * years:   Y or y
	 * months:  M
	 * weeks:   W or w
	 * days:    D or d
	 * hours:   H or h
	 * minutes: m
	 * seconds: s
	 * ms:      S
	 *
	 * You can use multiples of the same token together to add zero-length
	 * padding: (eg hh -> 01 instead of h -> 1)
	 *
	 * Escape token characters within the format string using square brackets
	 * (eg 'h [hrs], m [min]' -> '12 hrs, 3 min')
	 *
	 * @param {string}format
	 * @return {string}  A formatted string representation of this duration.
	 */
	toFormat( format ) {
		return this.normalize()[ privateProperties.duration ].format( format );
	}
}
