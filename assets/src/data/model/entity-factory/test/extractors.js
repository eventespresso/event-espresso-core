/**
 * External imports
 */
import { InvalidDateTime } from '@eventespresso/eejs';
import { DateTime, Money, SiteCurrency } from '@eventespresso/vo';

/**
 * Internal imports
 */
import {
	maybeConvertToValueObject,
	maybeConvertFromValueObject,
	maybeConvertFromValueObjectWithAssertions,
	derivePreparedValueForField,
	deriveRenderedValue,
	getRelationNameFromLink,
	deriveDefaultValueForType,
	deriveTypeForField,
	getDefaultValueForField,
} from '../extractors';
import {
	EventSchemaProperties,
	RegistrationSchemaProperties,
} from './fixtures';

jest.mock( '@eventespresso/eejs', () => ( {
	...require.requireActual( '@eventespresso/eejs' ),
	CURRENCY_CONFIG: {
		code: 'USD',
		singularLabel: 'dollar',
		pluralLabel: 'dollars',
		sign: '$',
		signB4: true,
		decimalMark: '.',
		thousandsSeparator: ',',
		subunits: 100,
	},
} ) );

describe( 'Testing extractor functions for model-entity factory.', () => {
	describe( 'maybeConvertToValueObject()', () => {
		it( 'Converts a given string to a DateTime value object for a ' +
			'datetime field', () => {
			expect( maybeConvertToValueObject(
				'EVT_visible_on',
				( new Date() ).toISOString(),
				EventSchemaProperties
			) ).toBeInstanceOf( DateTime );
		} );
		it( 'Converts a given number to a Money value object for a money field',
			() => {
				expect( maybeConvertToValueObject(
					'REG_final_price',
					1.25,
					RegistrationSchemaProperties
				) ).toBeInstanceOf( Money );
			} );
		it( 'Leaves value alone for a field that is not a value object field',
			() => {
				expect( maybeConvertToValueObject(
					'EVT_name',
					'Some title',
					EventSchemaProperties
				) ).toBe( 'Some title' );
			} );
	} );
	describe( 'maybeConvertFromValueObjectWithAssertions()', () => {
		const testThrows = ( fieldName, fieldValue, schema ) => () =>
			maybeConvertFromValueObjectWithAssertions(
				fieldName,
				fieldValue,
				schema
			);
		it( 'Throws an exception when the provided value is not a DateTime ' +
			'value object for a date-time field.', () => {
			expect( testThrows(
				'EVT_visible_on',
				'invalid date',
				EventSchemaProperties
			) ).toThrow( InvalidDateTime );
		} );
		it( 'Throws an exception when the provided value is not a Money ' +
			'value object for a money field.', () => {
			expect( testThrows(
				'REG_final_price',
				0,
				RegistrationSchemaProperties
			) ).toThrow( TypeError );
		} );
		it( 'Returns expected value when the provided value is a DateTime ' +
			'value object for a date-time field.', () => {
			const testDate = DateTime.fromJSDate( new Date() );
			expect( maybeConvertFromValueObjectWithAssertions(
				'EVT_visible_on',
				testDate,
				EventSchemaProperties
			) ).toEqual( testDate.toISO() );
		} );
		it( 'Returns expected value when the provided value is a Money ' +
			'value object for a money field.', () => {
			const testMoney = new Money( 1.25, SiteCurrency );
			expect( maybeConvertFromValueObjectWithAssertions(
				'REG_final_price',
				testMoney,
				RegistrationSchemaProperties
			) ).toEqual( testMoney.toNumber() );
		} );
		it( 'Returns expected value when the provided value is not expected ' +
			'to be a value object per the provided field\'s schema', () => {
			expect( maybeConvertFromValueObjectWithAssertions(
				'EVT_name',
				'Some title',
				EventSchemaProperties
			) ).toEqual( 'Some title' );
		} );
	} );
	describe( 'maybeConvertFromValueObject()', () => {
		const testDate = DateTime.fromJSDate( new Date() );
		const testMoney = new Money( 1.25, SiteCurrency );
		const tests = [
			[
				'It returns the expected value for converting a DateTime ' +
				'object.',
				testDate,
				testDate.toISO(),
			],
			[
				'It returns the expected value for converting a Money ' +
				'object.',
				testMoney,
				testMoney.toNumber(),
			],
			[
				'It returns the expected value for a non value object.',
				'some value',
				'some value',
			],
		];
		tests.forEach( ( [ description, testValue, expectedValue ] ) => {
			it( description, () => {
				expect( maybeConvertFromValueObject( testValue ) )
					.toEqual( expectedValue );
			} );
		} );
	} );
	describe( 'derivePreparedValueForField', () => {
		it( 'returns a DateTime value object for a date-time value', () => {
			expect( derivePreparedValueForField(
				'EVT_visible_on',
				( new Date() ).toISOString(),
				EventSchemaProperties
			) ).toBeInstanceOf( DateTime );
		} );
		it( 'returns a Money object for a money value', () => {
			expect( derivePreparedValueForField(
				'REG_final_price',
				{ raw: 1.25 },
				RegistrationSchemaProperties
			) ).toBeInstanceOf( Money );
		} );
		it( 'returns just the value for a non value object', () => {
			expect( derivePreparedValueForField(
				'EVT_desc',
				{ raw: 'Some description' },
				EventSchemaProperties
			) ).toEqual( 'Some description' );
		} );
	} );
	describe( 'deriveRenderedValue()', () => {
		describe( 'returns the incoming value if it\'s not a plain object when',
			() => {
				it( 'is a primitive', () => {
					expect( deriveRenderedValue( 10 ) ).toBe( 10 );
				} );
				it( 'is a complex object (i.e. value object)', () => {
					expect( deriveRenderedValue(
						DateTime.fromJSDate( new Date() )
					) ).toBeInstanceOf( DateTime );
				} );
			} );
		describe( 'It returns expected value depending on contents of plain' +
			' object when', () => {
			const testConditions = [
				[
					'it has a pretty property',
					{
						pretty: 'I am pretty',
						rendered: 'I am rendered',
						raw: 'I am raw',
					},
					'I am pretty',
				],
				[
					'it does not have a pretty property but has a rendered ' +
					'property',
					{
						rendered: 'I am rendered',
						raw: 'I am raw',
					},
					'I am rendered',
				],
				[
					'it does not have pretty or rendered properties but has ' +
					'a raw property',
					{ raw: 'I am raw' },
					'I am raw',
				],
				[
					'it does not have pretty, rendered or raw properties',
					{ random: 'I am random' },
					{ random: 'I am random' },
				],
			];
			testConditions.forEach( ( [
				description,
				testValue,
				expectedValue,
			] ) => {
				it( description, () => {
					expect( deriveRenderedValue( testValue ) )
						.toEqual( expectedValue );
				} );
			} );
		} );
	} );
	describe( 'getRelationNameFromLink()', () => {
		it( 'returns a relation name from a given formatted link', () => {
			expect( getRelationNameFromLink(
				'https://api.eventespresso.com/registration'
			) ).toBe( 'registration' );
			expect( getRelationNameFromLink(
				'https://api.eventespresso.com/some_test_relation'
			) ).toBe( 'someTestRelation' );
		} );
	} );
	describe( 'deriveDefaultValueForType()', () => {
		const testConditions = [
			[
				'type is an array and it contains null',
				[ 'string', 'null' ],
				null,
			],
			[
				'type is an array and it does not contain null',
				[ 'string', 'number' ],
				'',
			],
			[
				'type is string',
				'string',
				'',
			],
			[
				'type is number',
				'number',
				0,
			],
			[
				'type is integer',
				'integer',
				0,
			],
			[
				'type is null',
				'null',
				null,
			],
			[
				'type is object',
				'object',
				null,
			],
			[
				'type is boolean',
				'boolean',
				false,
			],
			[
				'type is bool',
				'bool',
				false,
			],
		];
		testConditions.forEach( ( [
			description,
			testType,
			expectedValue,
		] ) => {
			it( description, () => {
				expect( deriveDefaultValueForType( testType ) )
					.toEqual( expectedValue );
			} );
		} );
		it( 'type is date-time', () => {
			const derivedValue = deriveDefaultValueForType( 'date-time' );
			expect( DateTime.validateISO8601( derivedValue ) ).toBe( true );
		} );
	} );
	describe( 'deriveTypeForField()', () => {
		const testConditions = [
			[
				'it returns date-time for DateTime fields',
				'EVT_visible_on',
				'date-time',
			],
			[
				'it returns the expected type for a field that has `raw`' +
				' property',
				'EVT_desc',
				'string',
			],
			[
				'it returns the expected type for a field that is not an object' +
				'type (and thus no raw property)',
				'EVT_name',
				'string',
			],
		];
		testConditions.forEach( ( [
			description,
			fieldName,
			expectedValue,
		] ) => {
			it( description, () => {
				expect( deriveTypeForField( fieldName, EventSchemaProperties ) )
					.toEqual( expectedValue );
			} );
		} );
	} );
	describe( 'getDefaultValueForField', () => {
		it( 'returns expected default value for field type', () => {
			expect( getDefaultValueForField(
				'EVT_desc',
				EventSchemaProperties
			) ).toBe( '' );
			expect( getDefaultValueForField(
				'REG_final_price',
				RegistrationSchemaProperties
			) ).toBeInstanceOf( Money );
			expect( getDefaultValueForField(
				'EVT_visible_on',
				EventSchemaProperties
			) ).toBeInstanceOf( DateTime );
		} );
	} );
} );
