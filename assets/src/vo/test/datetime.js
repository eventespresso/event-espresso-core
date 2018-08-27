/**
 * Internal imports
 */
import Datetime from '../date-time/datetime';
import Duration from '../date-time/duration';

/**
 * External imports
 */
import {
	InvalidISO8601String,
	InvalidLocale,
	InvalidTimezone,
	InvalidArgument,
	InvalidDateTime,
} from '@eventespresso/eejs';
import { capitalize } from 'lodash';

describe( 'DateTime Value Object', () => {
	const baseUnits = [
		'year',
		'month',
		'day',
		'hour',
		'minute',
		'second',
		'millisecond',
	];
	const testDateValues = {
		year: 2018,
		month: 12,
		day: 25,
		hour: 10,
		minute: 15,
		second: 0,
		millisecond: 200,
	};

	// this is the representation of the testDateValues object as milliseconds
	// from Unix Epoch (assuming testDateValues is in UTC).
	const testDateValueInMilliseconds = 1545732900200;

	// this is the representation of the testDateValues object as seconds from
	// Unix Epoch (assuming testDateValues is in UTC).
	const testDateValueInSeconds = 1545732900;

	const baseTestDate = Datetime.fromObject( testDateValues );

	describe( 'with Instance', () => {
		describe( 'constructors', () => {
			describe( 'DateTime.constructor', () => {
				it( 'throws an error when provided an invalid argument for ' +
					'iso8601DateString parameter', () => {
					const throwsError = () => new Datetime( 'invalid' );
					expect( throwsError ).toThrow( InvalidISO8601String );
				} );
				it( 'throws an error when provided an invalid timezone string',
					() => {
						const throwsError = () => new Datetime(
							new Date().toISOString(), 'invalid'
						);
						expect( throwsError ).toThrow( InvalidTimezone );
					}
				);
				it( 'throws an error when provided an invalid locale', () => {
					const throwsError = () => new Datetime(
						new Date().toISOString(),
						'UTC',
						'invalid'
					);
					expect( throwsError ).toThrow( InvalidLocale );
				} );
				describe( 'create getters and setters on instantiation', () => {
					const newValues = {
						year: 2017,
						month: 11,
						day: 24,
						hour: 9,
						minute: 14,
						second: 10,
						millisecond: 201,
					};
					baseUnits.forEach( ( unit ) => {
						it( unit + ' accessor returns expected value', () => {
							expect( baseTestDate[ unit ] )
								.toBe( testDateValues[ unit ] );
						} );
						it( unit + ' is immutable', () => {
							const shouldThrow = () => baseTestDate[ unit ] = 10;
							expect( shouldThrow ).toThrow();
						} );
						const fluentSetter = 'set' + capitalize( unit );
						describe( fluentSetter + '()', () => {
							const newDateTime = baseTestDate[ fluentSetter ](
								newValues[ unit ]
							);
							it( 'returns a different instance of DateTime',
								() => {
									expect( baseTestDate )
										.not
										.toBe( newDateTime );
								}
							);
							it( 'original value for ' + unit + ' has not ' +
								'changed', () => {
								expect( baseTestDate[ unit ] )
									.toBe( testDateValues[ unit ] );
							} );
							it( 'new DateTime has new Value for ' + unit,
								() => {
									expect( newDateTime[ unit ] ).toBe(
										newValues[ unit ]
									);
								}
							);
						} );
					} );
				} );
			} );
			describe( 'Static Constructor Tests', () => {
				const testConditions = [
					{
						method: 'fromISO',
						mainParam: 'ISOString',
						dateConstructedWith: () => {
							return new Date( testDateValueInMilliseconds )
								.toISOString();
						},
						expectedMethodError: InvalidISO8601String,
						timezoneTest: true,
						localeTest: true,
						expectedms: 200,
					},
					{
						method: 'fromJSDate',
						mainParam: 'date',
						expectedMethodError: TypeError,
						dateConstructedWith: () => {
							return new Date( testDateValueInMilliseconds );
						},
						timezoneTest: true,
						localeTest: true,
						expectedms: 200,
					},
					{
						method: 'fromMillis',
						mainParam: 'milliseconds',
						expectedMethodError: TypeError,
						dateConstructedWith: () => {
							return testDateValueInMilliseconds;
						},
						timezoneTest: false,
						localeTest: true,
						expectedms: 200,
					},
					{
						method: 'fromUnix',
						mainParam: 'seconds',
						expectedMethodError: TypeError,
						dateConstructedWith: () => {
							return testDateValueInSeconds;
						},
						timezoneTest: false,
						localeTest: true,
						expectedms: 0,
					},
					{
						method: 'fromLocal',
						mainParam: 'values',
						expectedMethodError: InvalidArgument,
						dateConstructedWith: () => {
							return testDateValues;
						},
						timezoneTest: false,
						localeTest: true,
						expectedms: 200,
					},
					{
						method: 'utc',
						mainParam: 'values',
						expectedMethodError: InvalidArgument,
						dateConstructedWith: () => {
							return testDateValues;
						},
						timezoneTest: false,
						localeTest: true,
						expectedms: 200,
					},
				];
				testConditions.forEach( ( testCondition ) => {
					const METHOD = testCondition.method;
					describe( 'DateTime.' + METHOD, () => {
						it( 'throws an error when provided an invalid ' +
							'argument for ' + testCondition.mainParam +
							' parameter', () => {
							const throwsError =
								() => Datetime[ METHOD ]( { month: 23 } );
							expect( throwsError ).toThrow(
								testCondition.expectedMethodError
							);
						} );
						if ( testCondition.timezoneTest ) {
							it( 'throws an error when provided an invalid ' +
								'timezone string', () => {
								const throwsError =
									() => Datetime[ METHOD ](
										testCondition.dateConstructedWith(),
										'invalid'
									);
								expect( throwsError )
									.toThrow( InvalidTimezone );
							} );
						}
						if ( testCondition.localeTest ) {
							it( 'throws an error when provided an invalid ' +
								'locale', () => {
								const throwsError =
									() => Datetime[ METHOD ](
										testCondition.dateConstructedWith(),
										'UTC',
										'invalid'
									);
								expect( throwsError )
									.toThrow( InvalidLocale );
							} );
						}
						describe( 'Valid instantiation tests', () => {
							const testDateTime = Datetime[ METHOD ](
								testCondition.dateConstructedWith()
							);
							it( 'instantiates an instance of DateTime', () => {
								expect( testDateTime )
									.toBeInstanceOf( Datetime );
							} );
							baseUnits.forEach( ( unit ) => {
								it( 'has the expected value for the unit ' +
									unit, () => {
									const expectedValue = unit === 'millisecond' ?
										testCondition.expectedms :
										testDateValues[ unit ];
									expect( testDateTime[ unit ] )
										.toBe( expectedValue );
								} );
							} );
						} );
					} );
				} );
				describe( 'fromObject()', () => {
					it( 'throws an Error when values value provided is ' +
						'not an object', () => {
						const throwsError = () => Datetime.fromObject( null );
						expect( throwsError ).toThrow( TypeError );
					} );
					it( 'throws an Error when invalid date values are ' +
						'passed in', () => {
						const throwsError = () => Datetime.fromObject( {
							month: 23,
						} );
						expect( throwsError ).toThrow( InvalidArgument );
					} );
					it( 'throws an error with a invalid locale ' +
						'provided', () => {
						const throwsError = () => Datetime.fromObject( {
							...testDateValues,
							locale: 'invalid',
						} );
						expect( throwsError ).toThrow( InvalidLocale );
					} );
					it( 'throws an error with an invalid timezone ' +
						'provided', () => {
						const throwsError = () => Datetime.fromObject( {
							...testDateValues,
							timezone: 'invalid',
							offset: null,
						} );
						expect( throwsError ).toThrow( InvalidTimezone );
					} );
					it( 'throws an error with an invalid offset', () => {
						const throwsError = () => Datetime.fromObject( {
							...testDateValues,
							offset: 'invalid',
						} );
						expect( throwsError ).toThrow( TypeError );
					} );
					describe( 'Has expected unit values on instantiation',
						() => {
							const testDateTime = Datetime.fromObject(
								testDateValues
							);
							it( 'returns an instance of DateTime', () => {
								expect( testDateTime ).toBeInstanceOf( Datetime );
							} );
							baseUnits.forEach( ( unit ) => {
								it( 'has the expected value for the unit: ' +
									unit, () => {
									expect( testDateTime[ unit ] )
										.toBe( testDateValues[ unit ] );
								} );
							} );
						} );
				} );
			} );
		} );
		describe( 'timezones, offset, and locale', () => {
			const testConditions = [
				{
					name: 'timezone',
					testDate: new Datetime( '', 'America/New_York' ),
					expectedOriginalValue: 'America/New_York',
					expectedNewValue: 'UTC',
				},
				{
					name: 'offset',
					testDate: Datetime.fromObject( {
						...testDateValues,
						offset: 5,
					} ),
					expectedOriginalValue: 300,
					expectedNewValue: -300,
				},
				{
					name: 'locale',
					testDate: new Datetime(),
					expectedOriginalValue: 'en',
					expectedNewValue: 'en-ca',
				},
			];
			testConditions.forEach( ( testCondition ) => {
				const {
					name,
					testDate,
					expectedOriginalValue,
					expectedNewValue,
				} = testCondition;
				const setter = 'set' + capitalize( name );
				describe( name + ' tests', () => {
					describe( name + ' accessor', () => {
						it( 'returns expected ' + name, () => {
							expect( testDate[ name ] )
								.toBe( expectedOriginalValue );
						} );
					} );
					describe( setter + '()', () => {
						const newDate = testDate[ setter ]( expectedNewValue );
						it( 'newDate is an instance of DateTime', () => {
							expect( newDate ).toBeInstanceOf( Datetime );
						} );
						it( 'newDate.' + name + ' is the ' +
							'expected value', () => {
							expect( newDate[ name ] ).toBe( expectedNewValue );
						} );
						it( 'original DateTime has not been mutated', () => {
							expect( testDate[ name ] )
								.toBe( expectedOriginalValue );
						} );
					} );
				} );
			} );
		} );
		describe( 'various other getters', () => {
			const testDate = Datetime.fromObject( {
				...testDateValues,
				timezone: 'America/New_York',
			} );
			const testConditions = [
				[ 'daysInMonth', 31 ],
				[ 'isInDST', false ],
				[ 'isInLeapYear', false ],
				[ 'dayOfYear', 359 ],
				[ 'quarter', 4 ],
				[ 'weekNumber', 52 ],
				[ 'weekYear', 2018 ],
				[ 'weekDay', 2 ],
				[ 'weeksInWeekYear', 52 ],
			];
			testConditions.forEach( ( testCondition ) => {
				const [ name, expectedValue ] = testCondition;
				describe( name + ' getter', () => {
					it( 'returns expected value', () => {
						expect( testDate[ name ] ).toBe( expectedValue );
					} );
				} );
			} );
		} );
		describe( 'diff()', () => {
			const duration = baseTestDate.diff(
				Datetime.fromObject( {
					...testDateValues,
					day: testDateValues.day - 1,
				} )
			);
			it( 'throws an error when a DateTime is not provided', () => {
				const newDate = () => baseTestDate.diff( null );
				expect( newDate ).toThrow( InvalidDateTime );
			} );
			it( 'returns an instance of Duration', () => {
				expect( duration ).toBeInstanceOf( Duration );
			} );
			it( 'duration has expected value', () => {
				expect( duration.toObject() ).toEqual(
					{
						years: 0,
						months: 0,
						days: 1,
						hours: 0,
						minutes: 0,
						seconds: 0,
						milliseconds: 0,
					}
				);
			} );
		} );
		describe( 'diffNow()', () => {
			// one day from now.
			const testDate = Datetime.fromMillis( Date.now() + 86400000 );
			const duration = testDate.diffNow();
			it( 'returns an instance of Duration', () => {
				expect( duration ).toBeInstanceOf( Duration );
			} );
			it( 'duration has expected value', () => {
				// because of the precision involved, we allow a little leeway
				// in the passing test since the test may execute 1 or 2
				// milliseconds off.
				const passedTest = duration.days === 1 || (
					duration.hours === 23 &&
					duration.minutes === 59 &&
					duration.seconds === 59
				);
				expect( passedTest ).toBe( true );
			} );
		} );
		describe( 'endOf()', () => {
			const endOfDay = baseTestDate.endOf( Datetime.UNIT_MONTH );

			it( 'returns an instance of DateTime', () => {
				expect( endOfDay ).toBeInstanceOf( Datetime );
			} );
			it( 'returns a NEW instance of DateTime', () => {
				expect( endOfDay ).not.toBe( baseTestDate );
			} );
			it( 'does not change original DateTime', () => {
				expect( baseTestDate.toObject() ).toEqual( testDateValues );
			} );
			it( 'returns expected value for day', () => {
				expect( endOfDay.day ).toBe( 31 );
			} );
		} );
		describe( 'equals()', () => {
			const equalsDate = Datetime.fromObject( testDateValues );
			const nonEqualsDate = Datetime.fromObject( {
				...testDateValues,
				hour: 15,
			} );
			it( 'throws an error if otherDateTime is not an instance of ' +
				'DateTime', () => {
				expect( () => baseTestDate.equals( null ) )
					.toThrow( InvalidDateTime );
			} );
			it( 'returns true for equal dates', () => {
				expect( baseTestDate.equals( equalsDate ) ).toBe( true );
			} );
			it( 'returns false for non-equal dates', () => {
				expect( baseTestDate.equals( nonEqualsDate ) ).toBe( false );
			} );
		} );
		describe( 'hasSame()', () => {
			const hasSameHourDate = Datetime.fromObject( {
				...testDateValues,
				minute: 55,
			} );
			it( 'throws an error if otherDateTime is not an instance of ' +
				'DateTime', () => {
				expect( () => baseTestDate.hasSame( null ) )
					.toThrow( InvalidDateTime );
			} );
			it( 'returns true when dates have same unit', () => {
				expect(
					baseTestDate.hasSame( hasSameHourDate, Datetime.UNIT_HOUR )
				).toBe( true );
			} );
			it( 'returns false when dates do not have same unit', () => {
				expect(
					baseTestDate.hasSame(
						hasSameHourDate,
						Datetime.UNIT_MINUTE
					)
				).toBe( false );
			} );
		} );
		describe( 'minus()', () => {
			const durationToSubtract = Duration.fromObject(
				{ [ Duration.UNIT_DAYS ]: 1 }
			);
			const balanceDateTime = baseTestDate.minus( durationToSubtract );
			it( 'throws an error if a Duration is not used', () => {
				expect( () => baseTestDate.minus( 3 ) )
					.toThrow( TypeError );
			} );
			it( 'returns a new instance of DateTime', () => {
				expect( balanceDateTime ).toBeInstanceOf( Datetime );
				expect( balanceDateTime ).not.toBe( baseTestDate );
			} );
			it( 'does not mutate original DateTime', () => {
				expect( baseTestDate.toObject() ).toEqual( testDateValues );
			} );
			it( 'returns expected value for new DateTime', () => {
				expect( balanceDateTime.toObject() ).toEqual( {
					...testDateValues,
					day: 24,
				} );
			} );
		} );
		describe( 'plus()', () => {
			const durationToAdd = Duration.fromObject(
				{ [ Duration.UNIT_DAYS ]: 1 }
			);
			const balanceDateTime = baseTestDate.plus( durationToAdd );
			it( 'throws an error if a Duration is not used', () => {
				expect( () => baseTestDate.add( 3 ) )
					.toThrow( TypeError );
			} );
			it( 'returns a new instance of DateTime', () => {
				expect( balanceDateTime ).toBeInstanceOf( Datetime );
				expect( balanceDateTime ).not.toBe( baseTestDate );
			} );
			it( 'does not mutate original DateTime', () => {
				expect( baseTestDate.toObject() ).toEqual( testDateValues );
			} );
			it( 'returns expected value for new DateTime', () => {
				expect( balanceDateTime.toObject() ).toEqual( {
					...testDateValues,
					day: 26,
				} );
			} );
		} );
		describe( 'startOf()', () => {
			const startOfDay = baseTestDate.startOf( Datetime.UNIT_DAY );
			it( 'returns a new instance of DateTime', () => {
				expect( startOfDay ).toBeInstanceOf( Datetime );
				expect( startOfDay ).not.toBe( baseTestDate );
			} );
			it( 'does not mutate original DateTime', () => {
				expect( baseTestDate.toObject() ).toEqual( testDateValues );
			} );
			it( 'returns the expected unit values for the result', () => {
				expect( startOfDay.toObject() ).toEqual( {
					...testDateValues,
					hour: 0,
					minute: 0,
					second: 0,
					millisecond: 0,
				} );
			} );
		} );
		describe( 'toFormat', () => {
			const testConditions = [
				[
					'dddd, MMMM Do YYYY, h:mm:ss a',
					'Tuesday, December 25th 2018, 10:15:00 am',
				],
				[
					'dddd, ha',
					'Tuesday, 10am',
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [ format, expectedResult ] = testCondition;
				it( 'returns expected value for the format: ' + format, () => {
					expect( baseTestDate.toFormat( format ) )
						.toBe( expectedResult );
				} );
			} );
		} );
		describe( 'toISO()', () => {
			const testDate = Datetime.fromObject( {
				...testDateValues,
				offset: 0,
			} );
			it( 'returns the expected value', () => {
				expect( testDate.toISO() )
					.toBe( '2018-12-25T10:15:00.200+00:00' );
			} );
		} );
		describe( 'toJSDate()', () => {
			const testDate = Datetime.fromObject( {
				...testDateValues,
				offset: 0,
			} );
			it( 'returns an instance of Date', () => {
				expect( testDate.toJSDate() ).toBeInstanceOf( Date );
			} );
			it( 'the Date has the expected value', () => {
				expect( testDate.toJSDate().toISOString() )
					.toEqual( '2018-12-25T10:15:00.200Z' );
			} );
		} );
		describe( 'toJSON()', () => {
			const testDate = Datetime.fromObject( {
				...testDateValues,
				timezone: 'UTC',
			} );
			it( 'returns the expected value', () => {
				expect( JSON.stringify( { date: testDate } ) )
					.toBe(
						'{"date":"2018-12-25T10:15:00.200Z"}'
					);
			} );
		} );
		describe( 'toLocal()', () => {
			// get current offset for local so we know what to expect for test.
			const offset = ( Datetime.fromObject( testDateValues ) )
				.offset / 60;
			const testDate = Datetime.fromObject( {
				...testDateValues,
				timezone: 'UTC',
			} );
			const expectedDate = testDate.setOffset( offset );
			//expected to have offset applied
			const localDate = testDate.toLocal();
			it( 'returns a new instance of DateTime', () => {
				expect( localDate ).toBeInstanceOf( Datetime );
				expect( localDate ).not.toBe( testDate );
			} );
			it( 'offset on local to be expected', () => {
				expect( localDate.offset ).toBe( offset * 60 );
			} );
			it( 'value for local date to be expected', () => {
				expect( localDate.toObject() )
					.toEqual( expectedDate.toObject() );
			} );
		} );
		describe( 'toMillis()', () => {
			it( 'returns expected value', () => {
				expect( ( Datetime.fromObject( {
					...testDateValues,
					timezone: 'UTC',
				} ) ).toMillis() ).toBe( testDateValueInMilliseconds );
			} );
		} );
		describe( 'toUTC()', () => {
			const dateInOffset = Datetime.fromObject( {
				...testDateValues,
				offset: 2,
			} );
			const utcDate = dateInOffset.toUTC();

			it( 'returns an instance of DateTime', () => {
				expect( utcDate ).toBeInstanceOf( Datetime );
			} );
			it( 'returns a new instance of Datetime', () => {
				expect( utcDate ).not.toBe( dateInOffset );
			} );
			it( 'does not change original DateTime', () => {
				expect( dateInOffset.toObject() ).toEqual(
					testDateValues
				);
				expect( dateInOffset.offset ).toBe( 120 );
			} );
			it( 'returns expected value for offset', () => {
				expect( utcDate.offset ).toBe( 0 );
			} );
			it( 'returns expected value', () => {
				expect( utcDate.toObject() ).toEqual( {
					...testDateValues,
					hour: 8,
				} );
			} );
		} );
		describe( 'toString()', () => {
			const testDate = Datetime.fromObject( {
				...testDateValues,
				timezone: 'UTC',
			} );
			const expectedValue = 'Date is: Tue Dec 25 2018 10:15:00 GMT+0000';
			it( 'returns expected value when coerced to string', () => {
				expect( `Date is: ${ testDate }` ).toBe( expectedValue );
			} );
		} );
		describe( 'valueOf()', () => {
			it( 'returns expected value when coerced to a number', () => {
				const testDate = Datetime.fromObject( {
					...testDateValues,
					timezone: 'UTC',
				} );
				expect( 1 + testDate )
					.toBe( testDateValueInMilliseconds + 1 );
			} );
		} );
	} );
	describe( 'static methods', () => {
		const laterDateTime = Datetime.fromObject( {
			...testDateValues,
			day: 31,
		} );
		describe( 'DateTime.max()', () => {
			const maxDateTime = Datetime.max(
				baseTestDate,
				laterDateTime
			);
			it( 'throws an error if any of the provided DateTimes are not a ' +
				'datetime object', () => {
				expect(
					() => Datetime.max( baseTestDate, null )
				).toThrow( TypeError );
			} );
			it( 'returns a new instance of DateTime', () => {
				expect( maxDateTime ).toBeInstanceOf( Datetime );
				expect( maxDateTime ).not.toBe( baseTestDate );
				expect( maxDateTime ).not.toBe( laterDateTime );
			} );
			it( 'returns a DateTime equivalent to the expected DateTime',
				() => {
					expect( maxDateTime.equals( laterDateTime ) )
						.toBe( true );
					expect( maxDateTime.equals( baseTestDate ) ).toBe( false );
				} );
		} );
		describe( 'DateTime.min()', () => {
			const minDateTime = Datetime.min(
				baseTestDate,
				laterDateTime,
			);
			it( 'throws an error if any of the provided DateTimes are not a ' +
				'datetime object', () => {
				expect(
					() => Datetime.max( baseTestDate, null )
				).toThrow( TypeError );
			} );
			it( 'returns a new instance of DateTime', () => {
				expect( minDateTime ).toBeInstanceOf( Datetime );
				expect( minDateTime ).not.toBe( baseTestDate );
				expect( minDateTime ).not.toBe( laterDateTime );
			} );
			it( 'returns a DateTime equivalent to the expected DateTime',
				() => {
					expect( minDateTime.equals( baseTestDate ) )
						.toBe( true );
					expect( minDateTime.equals( laterDateTime ) ).toBe( false );
				} );
		} );
	} );
} );
