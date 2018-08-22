/**
 * External imports
 */
import moment from 'moment';
import { capitalize, omit } from 'lodash';

/**
 * Internal imports
 */
import {
	InvalidDateTime,
	InvalidArgument,
} from '@eventespresso/eejs';
import * as assertions from './assertions';
import Duration from 'duration';

const privateProperties = {
	datetime: Symbol( 'DateTimePropertyDateTime' ),
};

const privateMethods = {
	getAccessorNames: Symbol( 'DateTimeMethodGetterSetterMethodNames' ),
	createGettersAndSetters: Symbol( 'DateTimeMethodCreateGettersAndSetters' ),
	extractMomentsFromDateTimes: Symbol( 'DateTimeMethodExtractMomentsFromDateTimes' ),
};

export class DateTime {
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

	static validateLocale( locale ) {
		return assertions.validateLocale( locale );
	}

	static assertLocaleIsValid( locale ) {
		assertions.assertLocaleIsValid( locale );
	}

	static validateISO8601( dateTimeString ) {
		return assertions.validateISO8601( dateTimeString );
	}

	static assertISO8601IsValid( dateTimeString ) {
		assertions.assertISO8601IsValid( dateTimeString );
	}

	static validateTimezone( timezone ) {
		return assertions.validateTimezone( timezone );
	}

	static assertTimezoneIsValid( timezone ) {
		assertions.assertTimezoneIsValid( timezone );
	}

	static validateIsDateTime( datetime ) {
		return datetime instanceof DateTime;
	}

	static assertIsDateTime( datetime ) {
		if ( ! DateTime.validateIsDateTime( datetime ) ) {
			throw new TypeError(
				'The provided value is not an instance of DateTime'
			);
		}
	}

	static isValid( datetime ) {
		return datetime.isValid();
	}

	static assertIsValid( datetime ) {
		if ( ! DateTime.isValid( datetime ) ) {
			throw new InvalidDateTime( datetime );
		}
	}

	static [ privateMethods.extractMomentsFromDateTimes ]( ...datetimes ) {
		return datetimes.map( ( datetime ) => {
			DateTime.assertIsDateTime( datetime );
			return datetime[ privateProperties.datetime ];
		} );
	}

	static max( ...datetimes ) {
		return new DateTime(
			moment.max(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
		);
	}

	static min( ...datetimes ) {
		return new DateTime(
			moment.min(
				DateTime[ privateMethods.extractMomentsFromDateTimes ](
					...datetimes
				)
			)
		);
	}

	static fromISO( ISOString, timezone = 'UTC', locale = 'en-us' ) {
		return new DateTime( ISOString, timezone, locale );
	}

	static fromJSDate( date, timezone = 'UTC', locale = 'en-us' ) {
		DateTime.assertTimezoneIsValid( timezone );
		DateTime.assertLocaleIsValid( locale );
		return new DateTime(
			moment( date ).tz( timezone ).locale( locale )
		);
	}

	static fromMillis( milliseconds, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		return new DateTime(
			moment( milliseconds ).locale( locale )
		);
	}

	static fromUnix( seconds, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		return new DateTime(
			moment.unix( seconds ).locale( locale )
		);
	}

	static local( values, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		const datetime = moment( values ).locale( locale );
		if ( ! datetime.isValid() ) {
			throw new InvalidArgument(
				'Double-check the values you sent in.',
				values
			);
		}
		return new DateTime( datetime );
	}

	static utc( values, locale = 'en-us' ) {
		DateTime.assertLocaleIsValid( locale );
		const datetime = moment.utc( values ).locale( locale );
		if ( ! datetime.isValid() ) {
			throw new InvalidArgument(
				'Double-check the values you sent in.',
				values
			);
		}
		return new DateTime( datetime );
	}

	static fromObject( values ) {
		const locale = values.locale || 'en-us';
		const timezone = values.timezone || 'local';
		const offset = values.offset || null;
		const valuesForConstruct = omit(
			values,
			[ 'locale', 'timezone', 'offset' ]
		);
		if ( offset !== null ) {
			return new DateTime(
				moment.utc( valuesForConstruct )
					.offset( offset )
					.locale( locale )
			);
		}

		if ( timezone === 'local' ) {
			return DateTime.local( valuesForConstruct, locale );
		}

		return new DateTime(
			moment.tz( valuesForConstruct, timezone ).locale( locale )
		);
	}

	[ privateMethods.getAccessorNames ]() {
		return [
			'hour',
			'minutes',
			'seconds',
			'milliseconds',
			'year',
			'month',
			'day',
		];
	}

	[ privateMethods.createGettersAndSetters ]() {
		this[ privateMethods.getAccessorNames ]().forEach(
			( accessorName ) => {
				// creates accessor for getting and setting the value via a
				// property
				// eg. instance.hour or instance.hour = 3
				Object.defineProperty( this, accessorName, {
					get() {
						return this[ privateProperties.datetime ]
							[ accessorName ]();
					},
					set( value ) {
						return this.set( { [ accessorName ]: value } );
					},
				} );
				// creates a fluent setter for the value.
				Object.defineProperty( this, 'set' + capitalize( accessorName ), {
					get() {
						return ( value ) => {
							return this.set( { [ accessorName ]: value } );
						};
					},
				} );
			}
		);
	}

	/**
	 * Used to set various parts of the datetime string.
	 * @param {{}}setObject
	 * @return {DateTime} A new DateTime object.
	 */
	set( setObject = {} ) {
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.set( setObject ),
			this.timezone,
			this.locale,
		);
	}

	get timezone() {
		return this[ privateProperties.datetime ].tz();
	}

	set timezone( timezone ) {
		DateTime.assertTimezoneIsValid( timezone );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.tz( timezone )
		);
	}

	get daysInMonth() {
		return this[ privateProperties.datetime ].daysInMonth();
	}

	get isInDST() {
		return this[ privateProperties.datetime ].isDST();
	}

	get isInLeapYear() {
		return this[ privateProperties.datetime ].isLeapYear();
	}

	get offset() {
		return this[ privateProperties.datetime ].utcOffset();
	}

	set offset( offset ) {
		return new DateTime(
			this[ privateProperties.datetime ].clone().utcOffset( offset )
		);
	}

	get dayOfYear() {
		return this[ privateProperties.datetime ].dayOfYear();
	}

	get quarter() {
		return this[ privateProperties.datetime].quarter();
	}

	get weekNumber() {
		return this[ privateProperties.datetime ].isoWeek();
	}

	get weekYear() {
		return this[ privateProperties.datetime ].isoWeekYear();
	}

	get weekDay() {
		return this[ privateProperties.datetime ].isoWeekday();
	}

	get weeksInWeekYear() {
		return this[ privateProperties.datetime ].isoWeeksInYear();
	}

	get locale() {
		return this[ privateProperties.datetime ].locale();
	}

	set locale( locale ) {
		DateTime.assertLocaleIsValid( locale );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.locale( locale )
		);
	}

	isValid() {
		return this[ privateProperties.datetime ].isValid();
	}

	diff( otherDateTime ) {
		DateTime.assertIsDateTime( otherDateTime );
		return new Duration(
			moment.duration(
				this[ privateProperties.datetime ]
					.diff( otherDateTime[ privateProperties.datetime ] )
			)
		);
	}

	diffNow() {
		return new Duration(
			moment.duration(
				this[ privateProperties.datetime ]
					.diff( moment() )
			)
		);
	}

	endOf( unit ) {
		return new DateTime(
			this[ privateProperties.datetime ].clone().endOf( unit )
		);
	}

	equals( otherDateTime ) {
		DateTime.assertIsDateTime( otherDateTime );
		return this[ privateProperties.datetime ]
			.isSame( otherDateTime[ privateProperties.datetime ] );
	}

	hasSame( otherDateTime, unit ) {
		DateTime.assertIsDateTime( otherDateTime );
		return this[ privateProperties.datetime ]
			.isSame( otherDateTime[ privateProperties.datetime ], unit );
	}

	minus( duration ) {
		Duration.assertIsValidDuration( duration );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.subtract( duration.toObject() )
		);
	}

	plus( duration ) {
		Duration.assertIsValidDuration( duration );
		return new DateTime(
			this[ privateProperties.datetime ]
				.clone()
				.add( duration.toObject() )
		);
	}

	startOf( unit ) {
		return new DateTime(
			this[ privateProperties.datetime ].clone().startOf( unit )
		);
	}

	toFormat( format ) {
		return this[ privateProperties.datetime ].format( format );
	}

	toISO() {
		return this[ privateProperties.datetime ].toISOString( true );
	}

	toJSDate() {
		return this[ privateProperties.datetime ].toJSDate();
	}

	toJSON() {
		return this[ privateProperties.datetime ].toJSON();
	}

	toLocal() {
		return new DateTime(
			this[ privateProperties.datetime ].clone().local()
		);
	}

	toMillis() {
		return this.valueOf();
	}

	toObject() {
		return this[ privateProperties.datetime ].toObject();
	}

	toUTC() {
		return new DateTime(
			this[ privateProperties.datetime ].clone().utc()
		);
	}

	toString() {
		return this[ privateProperties.datetime ].toString();
	}

	valueOf() {
		return this[ privateProperties.datetime ].valueOf();
	}
}
