/**
 * Internal imports
 */
import Duration from '../date-time/duration';

/**
 * External imports
 */
import { InvalidLocale, InvalidISO8601String } from '@eventespresso/eejs';
import { forEach } from 'lodash';
import moment from 'moment-timezone';

describe( 'Duration Value Object', () => {
	const baseObjectValues = {
		days: 0,
		hours: 0,
		minutes: 0,
		months: 0,
		seconds: 0,
		years: 0,
		milliseconds: 0,
	};
	describe( 'with Instance', () => {
		it( 'Throws an InvalidLocale error with invalid locale on construction',
			() => {
				const testInvalidDuration = () => {
					return new Duration( { years: 1 }, 'invalid' );
				};
				expect( testInvalidDuration ).toThrow( InvalidLocale );
			} );
		it( 'Is Immutable', () => {
			const testDuration = new Duration( { hours: 10 } );
			const testChange = () => testDuration.hours = 30;
			expect( testChange ).toThrow();
			expect( testDuration.hours ).toBe( 10 );
		} );
		describe( 'Getter generation (privateMethods.createGetters symbol)',
			() => {
				const expectedProperties = {
					days: 0,
					hours: 10,
					milliseconds: 0,
					minutes: 0,
					months: 0,
					seconds: 0,
					years: 0,
				};
				// @link https://github.com/moment/moment/blob/develop/src/lib/duration/bubble.js#L52
				// for longterm calculation method that is used internally for
				// `asYears` and `asMonths` calculations
				const expectedFunctions = {
					asDays: 10 / 24,
					asHours: 10,
					asMilliseconds: 36000000,
					asMinutes: 600,
					asMonths: 10 / ( ( 146097 / 4800 ) * 24 ),
					asSeconds: 36000,
					asYears: 10 / ( 12 * ( 146097 / 4800 ) * 24 ),
				};
				const testRuns = ( DurationInstance ) => {
					forEach( expectedProperties, ( value, property ) => {
						it( 'creates expected property ' + property, () => {
							expect( DurationInstance[ property ] ).toBe( value );
						} );
					} );
					forEach( expectedFunctions, ( value, func ) => {
						it( 'creates expected function ' + func, () => {
							expect( DurationInstance[ func ]() ).toBe( value );
						} );
					} );
				};
				describe( 'with Duration constructed from basic object as' +
					' values argument', () => {
					const testDuration = new Duration( { hours: 10 } );
					testRuns( testDuration );
				} );
				describe( 'with Duration constructed from moment.Duration' +
					' instance as values argument', () => {
					const testDuration = new Duration(
						moment.duration( { hours: 10 } )
					);
					testRuns( testDuration );
				} );
			} );
		describe( 'locale property', () => {
			const testDuration = new Duration( { hours: 10 } );
			describe( 'getter', () => {
				it( 'returns the default locale', () => {
					expect( testDuration.locale ).toBe( 'en' );
				} );
			} );
			describe( 'setLocale()', () => {
				it( 'returns a new Duration with the new locale', () => {
					const newDuration = testDuration.setLocale( 'en-ca' );
					expect( testDuration ).not.toBe( newDuration );
					expect( testDuration.hours ).toEqual( newDuration.hours );
					expect( newDuration.locale ).toBe( 'en-ca' );
					expect( testDuration.locale ).toBe( 'en' );
				} );
			} );
		} );
		describe( 'normalize()', () => {
			const testRuns = [
				[
					{
						years: 2,
						days: 5000,
					},
					{
						days: 8,
						hours: 0,
						milliseconds: 0,
						minutes: 0,
						months: 8,
						seconds: 0,
						years: 15,
					},
				],
				[
					{ hours: 1346 },
					{
						days: 25,
						hours: 2,
						milliseconds: 0,
						minutes: 0,
						months: 1,
						seconds: 0,
						years: 0,
					},
				],
			];
			testRuns.forEach( ( testRun ) => {
				it( 'returns a new Duration with the expected normalized ' +
					'values for the input of: ' +
					JSON.stringify( testRun[ 0 ] ), () => {
					const testDuration = new Duration( testRun[ 0 ] );
					const normalized = testDuration.normalize();
					expect( normalized ).not.toBe( testDuration );
					expect( normalized.toObject() ).toEqual( testRun[ 1 ] );
				} );
			} );
		} );
		describe( 'isValid getter', () => {
			it( 'returns false for an invalid duration', () => {
				const invalidDuration = new Duration( { cheeseburgers: 1 } );
				expect( invalidDuration.isValid ).toBe( false );
				expect( console ).toHaveErrored();
			} );
			it( 'returns true for a valid duration', () => {
				const validDuration = new Duration( { years: 10 } );
				expect( validDuration.isValid ).toBe( true );
			} );
		} );
		describe( 'sameAs()', () => {
			const testConditions = [
				[
					'same years and hours for both durations',
					{ years: 10, hours: 10 },
					{ years: 10, hours: 10 },
					true,
					false,
				],
				[
					'one duration has hours, other has days',
					{ hours: 24 },
					{ days: 1 },
					false,
					false,
				],
				[
					'one duration is valid, the other is invalid and also ' +
					'expect console error',
					{ hours: 24 },
					{ cheeseburgers: 3 },
					false,
					true,
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [
					description,
					durationAarg,
					durationBarg,
					expectSame,
					expectConsoleError,
				] = testCondition;
				it( 'expected response is as expected for ' +
					description, () => {
					const durationA = new Duration( durationAarg );
					const durationB = new Duration( durationBarg );
					if ( expectConsoleError ) {
						expect( console ).toHaveErrored();
					}
					expect( durationA.sameAs( durationB ) )
						.toBe( expectSame );
				} );
			} );
			it( 'throws an error when Duration instance is not provided',
				() => {
					const duration = new Duration( { years: 10 } );
					const test = () => duration.sameAs( 'error error' );
					expect( test ).toThrow( TypeError );
				} );
		} );
		describe( 'equals()', () => {
			const testConditions = [
				[
					'same years and hours for both durations',
					{ years: 10, hours: 10 },
					{ years: 10, hours: 10 },
					true,
					false,
				],
				[
					'one duration has hours, other has days',
					{ hours: 24 },
					{ days: 1 },
					true,
					false,
				],
				[
					'one duration is valid, the other is invalid and also ' +
					'expect console error',
					{ hours: 24 },
					{ cheeseburgers: 3 },
					false,
					true,
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [
					description,
					durationAarg,
					durationBarg,
					expectEquals,
					expectConsoleError,
				] = testCondition;
				it( 'expected equality response is as expected for ' +
					description, () => {
					const durationA = new Duration( durationAarg );
					const durationB = new Duration( durationBarg );
					if ( expectConsoleError ) {
						expect( console ).toHaveErrored();
					}
					expect( durationA.equals( durationB ) )
						.toBe( expectEquals );
				} );
			} );
			it( 'throws an error when Duration instance is not provided',
				() => {
					const duration = new Duration( { years: 10 } );
					const test = () => duration.equals( 'error error' );
					expect( test ).toThrow( TypeError );
				} );
		} );
		describe( 'plus()', () => {
			const testDuration = new Duration( { hours: 10 } );

			// 0 -> test Description
			// 1 -> passed in value
			// 2 -> expected `toObject()` on returned Duration
			// 3 -> expected return value for returnedDuration.asHours()
			const testConditions = [
				[
					'adding a Duration',
					new Duration( { hours: 14 } ),
					{ ...baseObjectValues, days: 1 },
					24,
				],
				[
					'adding via milliseconds',
					72000000, //20 hours
					{ ...baseObjectValues, days: 1, hours: 6 },
					30,
				],
				[
					'adding via object',
					{ hours: 14 },
					{ ...baseObjectValues, days: 1 },
					24,
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [
					description,
					passedInArg,
					expectedObject,
					expectedAsHoursValue,
				] = testCondition;
				describe( 'returns expected value when ' + description,
					() => {
						const newDuration = testDuration
							.plus( passedInArg );
						it( 'original Duration is not the same instance as ' +
							'new Duration', () => {
							expect( testDuration ).not.toBe( newDuration );
						} );
						it( 'original Duration has not been mutated', () => {
							expect( testDuration.hours ).toBe( 10 );
						} );
						it( 'new Duration has expected toObject value', () => {
							expect( newDuration.toObject() )
								.toEqual( expectedObject );
						} );
						it( 'new Duration has expected asHours value', () => {
							expect( newDuration.asHours() )
								.toBe( expectedAsHoursValue );
						} );
					} );
			} );
		} );
		describe( 'minus()', () => {
			const testDuration = new Duration( { hours: 34 } );

			// 0 -> test Description
			// 1 -> passed in value
			// 2 -> expected `toObject()` on returned Duration
			// 3 -> expected return value for returnedDuration.asHours()
			const testConditions = [
				[
					'subtracting a Duration',
					new Duration( { hours: 10 } ),
					{ ...baseObjectValues, days: 1 },
					24,
				],
				[
					'subtracting via milliseconds',
					72000000, //20 hours
					{ ...baseObjectValues, hours: 14 },
					14,
				],
				[
					'subtracting via object',
					{ hours: 10 },
					{ ...baseObjectValues, days: 1 },
					24,
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [
					description,
					passedInArg,
					expectedObject,
					expectedAsHoursValue,
				] = testCondition;
				describe( 'returns expected value when ' + description,
					() => {
						const newDuration = testDuration
							.minus( passedInArg );
						it( 'original Duration is not the same instance as ' +
							'new Duration', () => {
							expect( testDuration ).not.toBe( newDuration );
						} );
						it( 'original Duration has not been mutated', () => {
							expect( testDuration.hours ).toBe( 34 );
						} );
						it( 'new Duration has expected toObject value', () => {
							expect( newDuration.toObject() )
								.toEqual( expectedObject );
						} );
						it( 'new Duration has expected asHours value', () => {
							expect( newDuration.asHours() )
								.toBe( expectedAsHoursValue );
						} );
					} );
			} );
		} );
		describe( 'negate()', () => {
			describe( 'returns expected values for calling this method', () => {
				const testDuration = new Duration(
					{
						hours: 10,
						days: -1,
					}
				);
				const negatedDuration = testDuration.negate();
				it( 'results in new Duration', () => {
					expect( testDuration ).not.toBe( negatedDuration );
				} );
				it( 'does not mutate original Duration', () => {
					expect( testDuration.toObject() ).toEqual(
						{
							...baseObjectValues,
							hours: 10,
							days: -1,
						}
					);
				} );
				it( 'has expected values on new Duration', () => {
					expect( negatedDuration.toObject() ).toEqual(
						{
							...baseObjectValues,
							hours: -10,
							days: 1,
						}
					);
					expect( negatedDuration.normalize().toObject() ).toEqual(
						{
							...baseObjectValues,
							hours: 14,
						}
					);
				} );
			} );
		} );
		describe( 'toISO()', () => {
			it( 'returns an ISO 8601-compliant string representation of a ' +
				'Duration', () => {
				expect( new Duration( { hours: 10, days: 255 } ).toISO() )
					.toBe( 'P255DT10H' );
			} );
		} );
		describe( 'toJSON()', () => {
			it( 'returns an ISO 8601-compliant string representation of a ' +
				'Duration appropriate for use in JSON', () => {
				const testDuration = new Duration( { hours: 10, days: 255 } );
				expect(
					JSON.stringify(
						{
							duration: testDuration,
						}
					)
				).toBe( '{"duration":"P255DT10H"}' );
			} );
		} );
		describe( 'toString()', () => {
			it( 'returns an ISO 8601 representation of this Duration when the ' +
				'object is coerced to a string', () => {
				const testDuration = new Duration( { hours: 10, days: 255 } );
				expect( `Duration: ${ testDuration }` )
					.toBe( 'Duration: P255DT10H' );
			} );
		} );
		describe( 'valueOf()', () => {
			it( 'returns the millisecond value of the Duration when coerced ' +
				'to a number', () => {
				const testDuration = new Duration( { hours: 10, days: 255 } );
				expect( 1 + testDuration ).toBe( 22068000001 );
			} );
		} );
		describe( 'toFormat()', () => {
			const testHours = { hours: 24 };
			// 0 -> format string to test
			// 1 -> expected return value
			const testConditions = [
				[
					'y',
					'0',
				],
				[
					'y m d',
					'0 1',
				],
				[
					'h',
					'24',
				],
				[
					'm',
					'1,440',
				],
				[
					's',
					'86,400',
				],
				[
					'S',
					'86,400,000',
				],
				[
					'h:mm:ss S',
					'24:00:00 0',
				],
			];
			testConditions.forEach( ( testCondition ) => {
				const [ format, expectedValue ] = testCondition;
				it( 'returns expected result for ' +
					JSON.stringify( testHours ) + ' and format ' +
					'string ' + format, () => {
					expect(
						new Duration( testHours )
							.toFormat( format )
					).toBe( expectedValue );
				} );
			} );
		} );
	} );
	describe( 'static methods', () => {
		describe( 'DateTime.fromMilliseconds', () => {
			describe( 'constructs an instance of Duration from milliseconds',
				() => {
					const testDuration = Duration.fromMilliseconds( 86400000 );
					it( 'is an instance of Duration', () => {
						expect( testDuration ).toBeInstanceOf( Duration );
					} );
					it( 'has the expected locale', () => {
						expect( testDuration.locale ).toBe( 'en' );
					} );
					it( 'has the expected milliseconds value', () => {
						expect( testDuration.milliseconds ).toBe( 86400000 );
					} );
				} );
		} );
		describe( 'DateTime.fromObject', () => {
			describe( 'constructs an instance of Duration from invalid object',
				() => {
					const testDuration = () => {
						return Duration.fromObject(
							{
								hours: 24,
								cheeseburgers: 1,
							}
						);
					};
					it( 'outputs a console error', () => {
						testDuration();
						expect( console ).toHaveErrored();
					} );
					it( 'is considered invalid', () => {
						const duration = testDuration();
						expect( console ).toHaveErrored();
						expect( duration.isValid ).toBe( false );
					} );
					it( 'has expected values', () => {
						const duration = testDuration();
						expect( console ).toHaveErrored();
						expect( duration.hours ).toBe( 24 );
					} );
					it( 'has expected locale', () => {
						const duration = testDuration();
						expect( console ).toHaveErrored();
						expect( duration.locale ).toBe( 'en' );
					} );
				} );
			describe( 'constructs an instance of Duration from a valid ' +
				'object', () => {
				const testDuration = Duration.fromObject(
					{
						hours: 24,
						days: 1,
					}
				);
				it( 'has expected values', () => {
					expect( testDuration.toObject() ).toEqual(
						{
							...baseObjectValues,
							hours: 24,
							days: 1,
						}
					);
				} );
				it( 'has expected locale', () => {
					expect( testDuration.locale ).toBe( 'en' );
				} );
			} );
		} );
		describe( 'DateTime.fromISO', () => {
			const testDuration = Duration.fromISO( 'P1DT24H30M' );
			it( 'returns an instance of Duration', () => {
				expect( testDuration ).toBeInstanceOf( Duration );
			} );
			it( 'has expected values', () => {
				expect( testDuration.toObject() ).toEqual(
					{
						...baseObjectValues,
						days: 2,
						minutes: 30,
					}
				);
			} );
			it( 'has expected locale', () => {
				expect( testDuration.locale ).toBe( 'en' );
			} );
			it( 'throws a an InvalidISO8601String error for invalid duration ' +
				'format', () => {
				const getDuration = () => Duration.fromISO( 'invalid' );
				expect( getDuration ).toThrow( InvalidISO8601String );
			} );
		} );
		describe( 'DateTime.isValidDuration', () => {
			it( 'returns true for a valid duration', () => {
				const testDuration = new Duration( { hours: 24 } );
				expect( Duration.isValidDuration( testDuration ) ).toBe( true );
			} );
			it( 'throws a console error and returns false for invalid ' +
				'duration instance', () => {
				const testDuration = new Duration(
					{ hours: 24, cheeseburgers: 1 }
				);
				expect( console ).toHaveErrored();
				expect( Duration.isValidDuration( testDuration ) ).toBe( false );
			} );
			it( 'returns false when value is not an instance of Duration',
				() => {
					expect( Duration.isValidDuration( 'invalid' ) ).toBe( false );
				} );
		} );
		describe( 'DateTime.isDuration', () => {
			it( 'returns true for a value that is an instance of ' +
				'Duration', () => {
				expect( Duration.isDuration( new Duration ) ).toBe( true );
			} );
			it( 'returns false for a value that is not an instance of ' +
				'Duration', () => {
				expect( Duration.isDuration( null ) ).toBe( false );
			} );
		} );
		describe( 'DateTime.assertIsDuration', () => {
			it( 'throws an error for a value that is not an instance of ' +
				'Duration', () => {
				const invalidDuration = () => Duration.assertIsDuration( null );
				expect( invalidDuration ).toThrow( TypeError );
			} );
		} );
	} );
} );
