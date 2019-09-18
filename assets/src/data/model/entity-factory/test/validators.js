/**
 * External imports
 */
import { DateTime, Money, SiteCurrency } from '@eventespresso/value-objects';
import {
	EventSchemaProperties,
	RegistrationSchemaProperties,
} from '@test/fixtures';

/**
 * Internal Imports
 */
import {
	validateType,
	validateEnumType,
	isShallowValidValueForField,
} from '../validators';

describe( 'Testing validator functions for model-entity factory', () => {
	describe( 'validateType()', () => {
		const testConditions = [
			[
				'returns false for invalid integer',
				'integer',
				1.26,
				false,
			],
			[
				'returns true for valid integer',
				'integer',
				2,
				true,
			],
			[
				'returns false for invalid number',
				'number',
				'invalid',
				false,
			],
			[
				'returns true for valid number',
				'number',
				1.25,
				true,
			],
			[
				'returns false for invalid string',
				'string',
				1,
				false,
			],
			[
				'returns true for valid string',
				'string',
				'valid',
				true,
			],
			[
				'returns false for invalid plain object',
				'object',
				'invalid',
				false,
			],
			[
				'returns true for valid plain object',
				'object',
				{},
				true,
			],
			[
				'returns false for invalid boolean',
				'bool',
				'invalid',
				false,
			],
			[
				'returns true for valid boolean',
				'bool',
				false,
				true,
			],
			[
				'returns false for invalid null',
				'null',
				'invalid',
				false,
			],
			[
				'returns true for valid null',
				'null',
				null,
				true,
			],
			[
				'returns false for invalid type in an array of types',
				[ 'integer', 'number' ],
				'invalid',
				false,
			],
			[
				'returns true for valid type in an array of types',
				[ 'integer', 'number' ],
				1.25,
				true,
			],
		];
		testConditions.forEach( ( [
			description,
			testType,
			testValue,
			expectedResponse,
		] ) => {
			it( description, () => {
				expect( validateType( testType, testValue ) )
					.toBe( expectedResponse );
			} );
		} );
	} );
	describe( 'validateEnumType()', () => {
		const testConditions = [
			[
				'it returns false when not of the correct type',
				10,
				false,
			],
			[
				'it returns false when of the correct type but not of the ' +
				'expected enum values',
				'invalid',
				false,
			],
			[
				'it returns true when of the correct type and of the ' +
				'expected enum values',
				'valid',
				true,
			],
		];
		testConditions.forEach( ( [
			description,
			testValue,
			expectedValue,
		] ) => {
			it( description, () => {
				expect( validateEnumType(
					'string',
					[ 'a', 'b', 'valid' ],
					testValue,
				) ).toBe( expectedValue );
			} );
		} );
	} );
	describe( 'isShallowValidValueForField()', () => {
		const testCall = (
			fieldName,
			fieldValue,
			schema,
			expectValueObjects,
		) => () => isShallowValidValueForField(
			fieldName,
			fieldValue,
			schema,
			expectValueObjects,
		);
		const testEnumSchema = {
			enumfield: {
				type: 'string',
				enum: [ 'a', 'b', 'c' ],
			},
		};
		const testConditions = [
			[
				'it returns expected response for invalid primary key field ' +
				'value.',
				'EVT_ID',
				{},
				EventSchemaProperties,
				true,
				false,
				null,
			],
			[
				'it returns expected response for valid primary key ' +
				'field value that is a string',
				'EVT_ID',
				'some_id',
				EventSchemaProperties,
				true,
				true,
				null,
			],
			[
				'it returns expected response for valid primary key field ' +
				'value that is a number',
				'EVT_ID',
				12,
				EventSchemaProperties,
				true,
				true,
				null,
			],
			[
				'it returns expected response for invalid enum field',
				'enumfield',
				1.25,
				testEnumSchema,
				true,
				false,
				TypeError,
			],
			[
				'it returns expected response for valid enum field',
				'enumfield',
				'c',
				testEnumSchema,
				true,
				true,
				null,
			],
			[
				'it returns expected response for valid field value when ' +
				'value objects are expected',
				'EVT_visible_on',
				DateTime.fromJSDate( new Date() ),
				EventSchemaProperties,
				true,
				true,
				null,
			],
			[
				'it returns expected response for invalid field value when ' +
				'value objects are expected',
				'EVT_visible_on',
				'invalid date',
				EventSchemaProperties,
				true,
				false,
				TypeError,
			],
			[
				'it returns expected response for valid field value when ' +
				'value objects are not expected',
				'EVT_visible_on',
				( new Date() ).toISOString(),
				EventSchemaProperties,
				false,
				true,
				null,
			],
			[
				'it returns expected response for invalid field value that ' +
				'of object type for the schema field when value objects are' +
				'expected',
				'REG_final_price',
				1.25,
				RegistrationSchemaProperties,
				true,
				false,
				TypeError,
			],
			[
				'it returns expected response for valid field value that ' +
				'is of object type for the schema field when value objects ' +
				'are expected',
				'REG_final_price',
				new Money( 1.25, SiteCurrency ),
				RegistrationSchemaProperties,
				true,
				true,
				null,
			],
			[
				'it returns expected response for invalid field value that ' +
				'is of object type for the schema field when value objects ' +
				'are not expected',
				'REG_final_price',
				1.25,
				false,
				false,
				null,
			],
			[
				'it returns expected response for valid field value that ' +
				'is of object type for the schema field when value objects ' +
				'are not expected',
				'REG_final_price',
				{ raw: 1.25 },
				false,
				true,
				null,
			],
		];
		testConditions.forEach( ( [
			description,
			fieldName,
			testValue,
			schema,
			expectValueObjects,
			expectedValue,
			expectedException,
		] ) => {
			it( description, () => {
				if ( expectedException === null ) {
					expect( testCall(
						fieldName,
						testValue,
						schema,
						expectValueObjects
					)() ).toBe( expectedValue );
				} else {
					expect( testCall(
						fieldName,
						testValue,
						schema,
						expectValueObjects
					) ).toThrow( expectedException );
				}
			} );
		} );
	} );
} );
