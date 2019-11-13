/**
 * Internal imports
 */
import {
	hasRawProperty,
	hasPrettyProperty,
	hasRenderedProperty,
	hasFormatProperty,
	hasEnumProperty,
	isDateTimeField,
	isUTCDateTimeField,
	isPrimaryKeyField,
	isReadOnly,
	isEntityField,
	isMoneyField,
	isEnumField,
	isValueObjectField,
} from '../booleans';

/**
 * External Imports
 */
import {
	EventSchemaProperties,
	RegistrationSchemaProperties,
} from '@test/fixtures';

describe( 'Testing boolean functions for model-entity factory.', () => {
	const testRunner = (
		testConditions,
		methodToTest,
		schema = EventSchemaProperties,
	) => {
		testConditions.forEach( ( [
			description,
			fieldName,
			expectedResponse,
			withSchema = true,
		] ) => {
			it( description, () => {
				if ( withSchema && schema !== null ) {
					expect( methodToTest( fieldName, schema ) )
						.toBe( expectedResponse );
				} else {
					expect( methodToTest( fieldName ) )
						.toBe( expectedResponse );
				}
			} );
		} );
	};
	describe( 'hasRawProperty()', () => {
		const tests = [
			[ 'Expect false for non object.', 'some string', false ],
			[ 'Expect false for object without raw property', {}, false ],
			[ 'Expect true for object with raw property', { raw: 0 }, true ],
		];
		testRunner( tests, hasRawProperty, null );
	} );
	describe( 'hasPrettyProperty()', () => {
		const tests = [
			[ 'Expect false for non object.', 'some string', false ],
			[ 'Expect false for object without pretty property', {}, false ],
			[
				'Expect true for object with pretty property',
				{ pretty: 0 },
				true,
			],
		];
		testRunner( tests, hasPrettyProperty, null );
	} );
	describe( 'hasRenderedProperty()', () => {
		const tests = [
			[ 'Expect false for non object.', 'some string', false ],
			[ 'Expect false for object without rendered property', {}, false ],
			[
				'Expect true for object with rendered property',
				{ rendered: 0 },
				true,
			],
		];
		testRunner( tests, hasRenderedProperty, null );
	} );
	describe( 'hasFormatProperty()', () => {
		const tests = [
			[ 'Expect false for non object.', 'some string', false ],
			[ 'Expect false for object without format property', {}, false ],
			[
				'Expect true for object with format property',
				{ format: 0 },
				true,
			],
		];
		testRunner( tests, hasFormatProperty, null );
	} );
	describe( 'hasEnumProperty()', () => {
		const tests = [
			[ 'Expect false for non object.', 'some string', false ],
			[ 'Expect false for object without enum property', {}, false ],
			[
				'Expect true for object with enum property',
				{ enum: 0 },
				true,
			],
		];
		testRunner( tests, hasEnumProperty, null );
	} );
	describe( 'isDateTimeField', () => {
		const tests = [
			[ 'Expect false for non date-time field', 'EVT_desc', false ],
			[ 'Expect true for date-time field', 'EVT_visible_on', true ],
			[
				'Expect false for field that does not exist in schema',
				'invalid field',
				false,
			],
		];
		testRunner( tests, isDateTimeField );
	} );
	describe( 'isValueObjectField', () => {
		const tests = [
			[ 'Expect true for value object field', 'EVT_visible_on', true ],
			[ 'Expect false for non value object field', 'EVT_desc', false ],
		];
		testRunner( tests, isValueObjectField );
	} );
	describe( 'isUTCDateTimeField()', () => {
		const tests = [
			[
				'Expect false for non date-time field with schema',
				'EVT_desc',
				false,
				true,
			],
			[
				'Expect false for non UTC date-time field with schema',
				'EVT_visible_on',
				false,
				true,
			],
			[
				'Expect false for UTC-like field that is not in schema',
				'some_field_gmt',
				false,
				true,
			],
			[
				'Expect false for non date-time field without schema',
				'EVT_desc',
				false,
				false,
			],
			[
				'Expect false for non UTC date-time field without schema',
				'EVT_visible_on',
				false,
				false,
			],
			[
				'Expect true for UTC-like field that is not a date-time ' +
				'field without schema',
				'some_field_gmt',
				true,
				false,
			],
			[
				'Expect true for UTC date-time field that is in schema.',
				'EVT_visible_on_gmt',
				true,
				true,
			],
		];
		testRunner( tests, isUTCDateTimeField );
	} );
	describe( 'isPrimaryKeyField()', () => {
		const tests = [
			[
				'Expect false for valid field that is not a primary key field',
				'EVT_desc',
				false,
			],
			[
				'Expect false for field that does not exist in schema',
				'some_field',
				false,
			],
			[
				'Expect true for field that is a primary key field',
				'EVT_ID',
				true,
			],
		];
		testRunner( tests, isPrimaryKeyField );
	} );
	describe( 'isReadOnly()', () => {
		const tests = [
			[
				'Expect false for valid field that is not a readonly field',
				'EVT_desc',
				false,
			],
			[
				'Expect false for field that does not exist in schema',
				'some_field',
				false,
			],
			[
				'Expect true for field that is a read only field',
				'EVT_ID',
				true,
			],
		];
		testRunner( tests, isReadOnly );
	} );
	describe( 'isEntityField()', () => {
		const tests = [
			[
				'Expect false for valid field that is not an entity field',
				'registrations',
				false,
			],
			[
				'Expect false for field that does not exist in schema',
				'some_field',
				false,
			],
			[
				'Expect true for primary key field',
				'EVT_ID',
				true,
			],
			[
				'Expect true for field that is an entity field (non-primary key)',
				'EVT_desc',
				true,
			],
		];
		testRunner( tests, isEntityField );
	} );
	describe( 'isMoneyField()', () => {
		const tests = [
			[
				'Expect false for valid field that is not a money field',
				'REG_ID',
				false,
			],
			[
				'Expect false for field that does not exist in schema',
				'some_field',
				false,
			],
			[
				'Expect true for field that is a money field',
				'REG_final_price',
				true,
			],
		];
		testRunner( tests, isMoneyField, RegistrationSchemaProperties );
	} );
	describe( 'isEnumField()', () => {
		const testSchema = {
			non_enum_field: {
				type: 'string',
			},
			enum_field: {
				type: 'string',
				enum: [ 'value1', 'value2' ],
			},
			empty_enum: {
				type: 'string',
				enum: [],
			},
		};
		const tests = [
			[
				'Expect false for valid field that is not an enum field',
				'non_enum_field',
				false,
			],
			[
				'Expect false for field that does not exist in schema',
				'some_field',
				false,
			],
			[
				'Expect false for field that has an enum property but it is empty',
				'empty_enum',
				false,
			],
			[
				'Expect true for field that is an enum field',
				'enum_field',
				true,
			],
		];
		testRunner( tests, isEnumField, testSchema );
	} );
} );
